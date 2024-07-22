import { Request, Response } from "express";
import commentTable from "../schema/commentSchema";
import postTable from "../schema/postSchema";
import { IComment } from "../models/IComment";
const createComment = async (request: Request, response: Response) => {
  try {
    const { post, body, user } = request.body;
    // Validate input fields
    if (!post || !body || !user) {
      return response.status(400).json({
        message: "Post ID, body, and user are required",
      });
    }
    let comment: IComment | null = {
      post: post,
      body: body,
      user: user,
    };

    // Create a new comment in the database
    let savedComment = await commentTable.create(comment);
    const updatedPost = await postTable
      .findByIdAndUpdate(
        post,
        { $push: { comments: savedComment._id } },
        { new: true }
      )
      .populate("comments")
      .exec();
    response.json({
      post: updatedPost,
    });
  } catch (error: any) {
    return response.status(500).json({
      message: "Failed to create comment",
      error: error.message,
    });
  }
};

export default createComment;
