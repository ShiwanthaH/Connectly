import React, { useEffect } from "react";
import Header from "./components/Header";
import { Avatar, Button } from "@material-tailwind/react";
import Post from "./components/Post";
import { getPosts } from "./services/postServices";
import CreatePostModal from "./components/CreatePost";
import PostModal from "./components/SinglePost";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const posts = useSelector((state: any) => state?.posts);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const [openPost, setOpenPost] = React.useState(false);
  const [currPost, setCurrPost] = React.useState();

  const fetchPosts = async () => {
    const posts = await getPosts();

    dispatch({
      type: "SET_POSTS",
      payload: posts,
    });
  };

  const handleOpen = () => setOpen(!open);

  const handleOpenPost = (post: any) => {
    setCurrPost(post);
    setOpenPost(!openPost);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <CreatePostModal open={open} setOpen={setOpen} handleOpen={handleOpen} />
      {currPost && (
        <PostModal post={currPost} open={openPost} setOpen={setOpenPost} />
      )}
      <Header />

      <div className="w-full max-w-full h-[calc(100vh-60px)] bg-gray-50">
        <div className="w-full lg:w-1/2 min-h-[calc(100vh-60px)] mx-auto">
          <div className="w-full bg-gray-200 my-4 shadow-md p-8 flex items-center">
            <Avatar
              src="https://docs.material-tailwind.com/img/face-2.jpg"
              alt="avatar"
              className="mr-4"
            />
            <Button
              variant="gradient"
              color="white"
              className="bg-gray-300 w-full text-left capitalize text-lg text-gray-700"
              onClick={handleOpen}
            >
              What's on your mind?
            </Button>
          </div>

          <div className="w-full max-w-full flex flex-col gap-2">
            {posts?.data &&
              posts?.data?.length > 0 &&
              posts?.data?.map((post) => {
                console.log(post);
                return (
                  <div
                    onClick={() => {
                      handleOpenPost(post);
                    }}
                  >
                    <Post key={post.id} {...post} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
