import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { WinstonLoggerService } from '../logger/winston-logger.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1w' },
    }),
  ],
  controllers: [UsersController],
  providers: [
      UsersService,
      WinstonLoggerService,
    ],
  exports: [
    UsersService,
    WinstonLoggerService,
  ],
})
export class UsersModule {}