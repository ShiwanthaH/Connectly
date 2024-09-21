import express from "express";
import {
  createComment,
  deleteComment,
  getComment,
  getCommentsByPost,
  updateComment,
} from "../controllers/commentController";

const router = express.Router();

router.post("/post", getCommentsByPost);
router.get("/:id", getComment);
router.post("/", createComment);
router.put("/:id", updateComment);
router.delete("/:id", deleteComment);

export default router;
