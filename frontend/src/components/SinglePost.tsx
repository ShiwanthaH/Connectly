import React, { useState } from "react";
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
} from "@material-tailwind/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";

// Utility function to format time (mocking the actual function)
const timeAgo = (date: string) => {
  // For simplicity, you could use 'moment.js' or 'date-fns' to format dates
  return `${new Date(date).toLocaleDateString()} ago`;
};

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
  handleOpen: () => void;
}

const PostModal = ({ post, open, setOpen, handleOpen }: ModalProps) => {
  return (
    <Dialog open={open} handler={handleOpen} size="lg" className="rounded-lg">
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
                      src="https://docs.material-tailwind.com/img/face-3.jpg"
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
          onClick={() => {
            setOpen(false);
          }}
          color="red"
          variant="outlined"
          className="mr-2"
        >
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default PostModal;
