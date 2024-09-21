import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { stat } from "fs";

const prisma = new PrismaClient();

// Create a new User
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, email },
    });
    res.json({
      status: "SUCCESS",
      data: user,
      message: "User created successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Get all Users
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      status: "SUCCESS",
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Get a single User by ID
export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      res.status(404).json({ status: "FAILED", message: "User not found" });
    } else {
      res.json({
        status: "SUCCESS",
        data: user,
        message: "User retrieved successfully",
      });
    }
  } catch (error: any) {
    res.status(404).json({ status: "FAILED", message: error.message });
  }
};

// Update a User
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { username, email },
    });
    res.json({
      status: "SUCCESS",
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error: any) {
    res.status(400).json({ status: "FAILED", message: error.message });
  }
};

// Delete a User
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id },
    });
    res.json({ status: "SUCCESS", message: "User deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ status: "FAILED", message: error.message });
  }
};
