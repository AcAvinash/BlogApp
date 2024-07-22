import mongoose from "mongoose";
export interface IPost {
  title: string;
  body: string;
  likes?: mongoose.Schema.Types.ObjectId[];
  comments?: mongoose.Schema.Types.ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
