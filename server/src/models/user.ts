import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  entries?: mongoose.Types.ObjectId[];
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      maxlength: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    entries: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'entry',
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('user', userSchema);
