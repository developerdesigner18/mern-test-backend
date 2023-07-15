import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  userName: string;
  userEmail: string;
  userAge: number;
  country: string;
  gender: string;
  occupation: string;
}

const User = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  userAge: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

export const UserSchema = model<IUser>("UserSchema", User);
