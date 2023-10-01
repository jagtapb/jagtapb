import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jagtapbhushan11:P%40ndurang59@cluster0.qhknho7.mongodb.net/auth'),
    UsersModule,
  ],
})
export class AppModule {}
