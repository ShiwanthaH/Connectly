import React from "react";
import { Avatar, Button, Card, IconButton } from "@material-tailwind/react";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { FaChevronUp } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";

interface postProps {
  title: string;
  content: string;
  author: any;
  createdAt: string;
  comments: any;
  //   likes: number;
}

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

const Post = ({ title, content, author, createdAt, comments }: postProps) => {
  return (
    <Card className="w-full bg-gray-100">
      <div className="w-full flex items-center justify-between">
        <div className="flex p-4">
          <Avatar
            src="https://docs.material-tailwind.com/img/face-3.jpg"
            alt="avatar"
            className="mr-4"
          />
          <div>
            <div className="text-lg text-gray-700 font-bold">{author?.username}</div>
            <div className="text-sm text-gray-500">{timeAgo(createdAt)}</div>
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
        <div className="text-xl text-gray-700 font-bold px-8 py-4">{title}</div>
        <p className="text-gray-700 p-8 text-justify pt-0">{content}</p>
      </div>

      <div className="p-4 w-full flex items-center justify-between">
        <div className="flex items-center">
          <IconButton variant="text" className="text-2xl">
            <IoHeartOutline />
          </IconButton>
          <div className="text-gray-500">500 Likes</div>
        </div>

        <Button variant="text" className="text-gray-500">
          {comments.length} Comments
        </Button>
      </div>
    </Card>
  );
};

export default Post;
