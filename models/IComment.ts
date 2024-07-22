import mongoose from "mongoose";
export interface IComment {
  post: mongoose.Schema.Types.ObjectId;
  body: string;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
}
