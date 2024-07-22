import express, { Router, Request, Response } from "express";
import * as postControllers from "../controllers/postController";
import createComment from "../controllers/commentController";
import * as likeControllers from "../controllers/likeController";
const blog: Router = Router();

// create a  blog posts
blog.post("/posts/create", async (request: Request, response: Response) => {
  // Fetch all blog posts from the database and send them as JSON response
  await postControllers.createPost(request, response);
});

// get all blog posts from the database and send them as JSON response
blog.get("/posts", async (request: Request, response: Response) => {
  // Fetch all blog posts from the database and send them as JSON response
  await postControllers.getAllPost(request, response);
});

// creating a comment
blog.post("/comments/create", async (request: Request, response: Response) => {
  // create a comment and add it to the blog post
  await createComment(request, response);
});

blog.post("/likes/like", async (request: Request, response: Response) => {
  // create a comment and add it to the blog post
  await likeControllers.getLikes(request, response);
});

blog.post("/likes/unlike", async (request: Request, response: Response) => {
  // create a comment and add it to the blog post
  await likeControllers.unLikes(request, response);
});

export default blog;
