import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// Create a new Comment
export const createComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { content, postId, authorId } = req.body;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
    });
    res.json({
      staus: "SUCCESS",
      data: comment,
      message: "Comment created successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Get all Comments for a Post
export const getCommentsByPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { postId } = req.params;
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
    res.json({
      status: "SUCCESS",
      data: comments,
      message: "Comments retrieved",
    });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Get a single Comment by ID
export const getComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({
      where: { id },
      include: { author: true, post: true },
    });
    if (!comment) {
      res.status(404).json({ status: "FAILED", message: "Comment not found" });
    } else {
      res.json({
        status: "SUCCESS",
        data: comment,
        message: "Comment retrieved",
      });
    }
  } catch (error: any) {
    res.status(404).json({ status: "FAILED", message: error.message });
  }
};

// Update a Comment
export const updateComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { content } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.json({
      status: "SUCCESS",
      message: "Comment updated",
      data: updatedComment,
    });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Delete a Comment
export const deleteComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.comment.delete({
      where: { id },
    });
    res.json({ status: "SUCCESS", message: "Comment deleted" });
  } catch (error: any) {
    res.status(404).json({ status: "FAILED", message: error.message });
  }
};
