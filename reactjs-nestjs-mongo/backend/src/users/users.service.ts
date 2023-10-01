import { Model } from 'mongoose';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(user: User): Promise<User> {
    const createdUser = new this.userModel({
      name: user.name,
      email: user.email,
      password: await bcrypt.hash(user.password, 10)
    });
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({email}).exec();
    if(!user) {
      throw new UnauthorizedException('user not found');
    }

    if(!await bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException('invalid credentials');
    }

    return user;
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async update(id: string, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, {
      name: user.name,
      email: user.email,
      password: await bcrypt.hash(user.password, 10)
    }, { new: true }).exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndRemove(id).exec();
  }
}