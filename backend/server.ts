import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import postRouter from "./routes/post.routes";
import commentRouter from "./routes/comment.routes";
import userRouter from "./routes/user.routes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);
app.use("/api/user", userRouter);

app.get("/api", (req: Request, res: Response) => {
  res.send("Welcome to the Connectly API");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
