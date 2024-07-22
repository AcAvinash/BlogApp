import { Request, Response } from "express";
import postTable from "../schema/postSchema";
import { IPost } from "../models/IPost";
import mongoose from "mongoose";
export const createPost = async (request: Request, response: Response) => {
  try {
    const { title, body } = request.body;
    let post: IPost = {
      title: title,
      body: body,
    };
    const savedPost = await new postTable(post).save();
    if (savedPost) {
      return response.status(200).json({
        message: "Post created successfully",
        data: savedPost,
      });
    }
  } catch (error: any) {
    response.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
};

export const getAllPost = async (request: Request, response: Response) => {
  try {
    const blogs = await postTable.find().populate("comments").exec();

    if (blogs.length == 0) {
      response.status(404).json({
        message: "No post found",
      });
    } else {
      response.status(200).json({
        message: "Post found successfully",
        data: blogs,
      });
    }
  } catch (error: any) {
    response.status(500).json({
      message: "Error creating post",
      error: error.message,
    });
  }
};
