import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { stat } from "fs";

const prisma = new PrismaClient();

// Create a new Post
export const createPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, titleColor, content, authorId } = req.body;
  try {
    const post = await prisma.post.create({
      data: {
        title,
        titleColor,
        content,
        authorId,
      },
    });
    res.json({
      status: "SUCCESS",
      data: post,
      message: "Post created successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Get all Posts
export const getPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await prisma.post.findMany({
      include: { comments: true, author: true },
    });
    res.json({ status: "SUCCESS", data: posts, message: "Posts retrieved" });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Get a single Post by ID
export const getPost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        comments: {
          include: { author: true },
        },
        author: true,
      },
    });
    if (!post) {
      res.status(404).json({ status: "FAILED", message: "Post not found" });
    } else {
      res.json({ status: "SUCCESS", data: post, message: "Post retrieved" });
    }
  } catch (error: any) {
    res.status(404).json({ status: "FAILED", message: error.message });
  }
};

// Update a Post
export const updatePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, titleColor, content } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, titleColor, content },
    });
    res.json({ status: "SUCCESS", message: "Post updated", data: updatedPost });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Delete a Post
export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.post.delete({
      where: { id },
    });
    res.json({ status: "SUCCESS", message: "Post deleted" });
  } catch (error: any) {
    res.status(404).json({ status: "FAILED", message: error.message });
  }
};
