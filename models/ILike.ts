import mongoose from "mongoose";
export interface ILike {
  post: mongoose.Schema.Types.ObjectId;
  user: string;
  createdAt?: Date;
  updatedAt?: Date;
}
