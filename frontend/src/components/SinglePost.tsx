import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Card,
  Avatar,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { createComment, getComments } from "../services/commentServices";
import { USER_ID } from "../constants";
import { getPosts } from "../services/postServices";
import { useDispatch } from "react-redux";

function timeAgo(timestamp: string): string {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const seconds = diffInSeconds;
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 5) {
    return `${weeks} weeks ago`;
  } else if (months < 12) {
    return `${months} months ago`;
  } else {
    return `${years} years ago`;
  }
}

interface Comment {
  id: string;
  author: { username: string };
  content: string;
  createdAt: string;
}

interface Post {
  id: string;
  author: { username: string };
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
}

interface ModalProps {
  post: Post;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostModal = ({ post, open, setOpen }: ModalProps) => {
  const dispatch = useDispatch();

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false); // State to control comment modal
  const [newComment, setNewComment] = useState<string>("");

  const handleOpen = () => {
    setOpen(false);
  };

  const handleCommentModalOpen = () => {
    setIsCommentModalOpen(!isCommentModalOpen);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      await createComment(newComment, post?.id, USER_ID);
      console.log("New comment submitted:", newComment);
      setIsCommentModalOpen(false);
      setNewComment("");

      const newPosts = await getPosts();
      if (newPosts) {
        dispatch({
          type: "SET_POSTS",
          payload: newPosts,
        });
      }

      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      //   handler={handleOpen}
      size="md"
      className="rounded-lg overflow-scroll max-h-[90vh]"
    >
      <DialogHeader>{post.title}</DialogHeader>
      <DialogBody>
        <Card className="w-full bg-gray-100">
          <div className="w-full flex items-center justify-between">
            <div className="flex p-4">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-3.jpg"
                alt="avatar"
                className="mr-4"
              />
              <div>
                <div className="text-lg text-gray-700 font-bold">
                  {post?.author?.username}
                </div>
                <div className="text-sm text-gray-500">
                  {timeAgo(post?.createdAt)}
                </div>
              </div>
            </div>
            <Menu>
              <MenuHandler>
                <Button variant="text">
                  <BsThreeDotsVertical />
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
              </MenuList>
            </Menu>
          </div>

          <div>
            <div className="text-xl text-gray-700 font-bold px-8 py-4">
              {post?.title}
            </div>
            <p className="text-gray-700 p-8 text-justify pt-0">
              {post?.content}
            </p>
          </div>

          <div className="p-4 w-full flex items-center justify-between">
            <div className="flex items-center">
              <IconButton variant="text" className="text-2xl">
                <IoHeartOutline />
              </IconButton>
              <div className="text-gray-500">500 Likes</div>
            </div>

            <Button variant="text" className="text-gray-500">
              {post?.comments?.length} Comments
            </Button>
          </div>
        </Card>

        {/* Comments Section */}
        <div className="p-4 mt-4">
          <h3 className="text-lg text-gray-700 font-bold mb-4">Comments</h3>
          {post?.comments?.length > 0 ? (
            post?.comments?.map((comment) => (
              <div
                key={comment?.id}
                className="bg-white p-4 mb-4 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar
                      src="https://docs.material-tailwind.com/img/face-4.jpg"
                      alt="comment-author"
                      className="mr-4"
                    />
                    <div>
                      <div className="text-lg text-gray-700 font-bold">
                        {comment?.author?.username}
                      </div>
                      <div className="text-sm text-gray-500">
                        {timeAgo(comment?.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{comment?.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet.</p>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button
          onClick={handleCommentModalOpen}
          color="blue-gray"
          variant="outlined"
          className="mr-2"
        >
          Add Comment
        </Button>
        <Button
          onClick={handleOpen}
          color="red"
          variant="outlined"
          className="mr-2"
        >
          Close
        </Button>
      </DialogFooter>

      <Dialog
        open={isCommentModalOpen}
        handler={handleCommentModalOpen}
        size="md"
      >
        <DialogHeader>Add a Comment</DialogHeader>
        <DialogBody>
          <div className="w-full p-4">
            <Input
              label="Your Comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              placeholder="Enter your comment..."
              className="w-full mb-4"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={handleCommentSubmit}
            color="blue-gray"
            variant="filled"
            className="mr-2"
          >
            Submit
          </Button>
          <Button
            onClick={handleCommentModalOpen}
            color="red"
            variant="outlined"
            className="mr-2"
          >
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </Dialog>
  );
};

export default PostModal;
