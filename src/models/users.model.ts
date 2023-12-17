import { model, Schema, Document } from 'mongoose';
import IUser from '@interfaces/users.interface';

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
}).index({ email: 1 });

const userModel = model<IUser & Document>('User', userSchema);
export default userModel;
