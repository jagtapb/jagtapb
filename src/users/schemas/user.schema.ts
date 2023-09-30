import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  _id: String,
  name: String,
  password: String,
});