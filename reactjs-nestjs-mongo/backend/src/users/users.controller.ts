import { Body, Req, Res, Controller, Delete, Get, Param, Post, Put, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { WinstonLoggerService } from '../logger/winston-logger.service';

@Controller()
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly logger: WinstonLoggerService
    ) {}

  @Post('register')
  async register(@Body() user: User) {
    await this.usersService.register(user);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({passthrough: true}) response: Response
    ) {
      try {
        const user = await this.usersService.login(email, password);
        const token = await this.jwtService.signAsync({
          id: user._id
        }, { expiresIn: '30s'});
        const refreshToken = await this.jwtService.signAsync({
          id: user._id
        });
    
        response.status(200);
        response.cookie('refresh_token', refreshToken, {
          httpOnly: true,
          maxAge: 7 * 24 * 60 * 1000 // 1 week
        });
    
        return {token};    
      } catch(error) {
        this.logger.error('An error occurred', error.stack);
        throw new UnauthorizedException();
      }
  }

  @Post('user')
  async user(@Req() request: Request) {
    try {
      const accessToken = request.headers.authorization.replace('Bearer ', '');
      const { id } = await this.jwtService.verifyAsync(accessToken);
      return await this.usersService.findById(id);
    } catch(error) {
      this.logger.error('An error occurred', error.stack);
      throw new UnauthorizedException();
    }
  }

  @Post('refresh')
  async refresh(
    @Req() request: Request,
    @Res({passthrough: true}) response: Response
  ) {
    try {
      const refreshToken = request.cookies['refresh_token'];
      const { id } = await this.jwtService.verifyAsync(refreshToken);
      const token = await this.jwtService.signAsync({id}, { expiresIn: '30s'});
      response.status(200);
      return {token};
    } catch(error) {
      this.logger.error('An error occurred', error.stack);
      new UnauthorizedException();
    }
  }

  @Post('logout')
  async logout(
    @Res({passthrough: true}) response: Response
  ) {
    response.clearCookie('refresh_token');
    return {
      message: 'success'
    }
  }

  @Get('users')
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('users/:id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }

  @Put('users/:id')
  async update(@Param('id') id: string, @Body() user: User): Promise<User> {
    return await this.usersService.update(id, user);
  }

  @Delete('users/:id')
  async delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}