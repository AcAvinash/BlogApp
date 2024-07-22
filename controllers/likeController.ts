import { Request, Response } from "express";
import likeTable from "../schema/likeSchema";
import postTable from "../schema/postSchema";

export const getLikes = async (request: Request, response: Response) => {
  try {
    const { post, user } = request.body;
    let theLikes = {
      post: post,
      user: user,
    };
    const newLike = await new likeTable(theLikes).save();
    const savedLikes = await postTable
      .findByIdAndUpdate(post, { $push: { likes: newLike._id } }, { new: true })
      .populate("likes")
      .exec();
    response.json(savedLikes);
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};

export const unLikes = async (request: Request, response: Response) => {
  try {
    const { post, like } = request.body;

    // Validate input fields
    if (!post || !like) {
      return response.status(400).json({
        message: "Post ID and Like ID are required",
      });
    }

    // Find and delete the like from the likes collection
    const deletedLike = await likeTable.findOneAndDelete({
      post: post,
      _id: like,
    });

    if (!deletedLike) {
      return response.status(404).json({
        message: "Like not found",
      });
    }

    // Remove the like reference from the post's likes array
    const updatedPost = await postTable
      .findByIdAndUpdate(
        post,
        { $pull: { likes: deletedLike._id } },
        { new: true }
      )
      .populate("likes")
      .exec(); // populate if you need the likes data

    response.status(200).json({
      message: "Unliked successfully",
      data: updatedPost,
    });
  } catch (error: any) {
    response.status(500).json({ message: error.message });
  }
};
