import React, { useCallback, useEffect, useState } from "react";
import axios from "../utils/axios";
import PostItem from "../components/PostItem";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

function MyPostsPage() {
  const { posts: allPosts } = useSelector((state) => state.posts);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const fetchMyPosts = useCallback(async () => {
    setIsloading(true);

    try {
      setIsloading(true);

      const { data } = await axios.get("/posts/user/me");
      setPosts(data);
    } catch (error) {
      console.log(error);
    }

    setIsloading(false);
  }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts, allPosts.length]);

  if (posts.length === 0 && !isLoading) {
    return (
      <div className="text-xl text-center text-white py-10">
        There are no posts
      </div>
    );
  }

  return (
    <div className="w-1/2 mx-auto py-10 flex flex-col gap-10 lg:w-full">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} />
      ))}
      {isLoading && <Loader />}
    </div>
  );
}

export default MyPostsPage;
