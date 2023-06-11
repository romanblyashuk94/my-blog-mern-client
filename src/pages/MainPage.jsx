import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PostItem from "../components/PostItem";
import PopularPost from "../components/PopularPost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../redux/features/posts/postsSlice";

function MainPage(props) {
  const dispatch = useDispatch();
  const { posts, popularPosts, isLoading, errorMessage } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  if (errorMessage) {
    return (
      <div className="text-xl text-center text-white py-10">{errorMessage}</div>
    );
  }

  if (posts.length === 0 && !isLoading) {
    return (
      <div className="text-xl text-center text-white py-10">
        There are no posts
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto py-10">
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5 md:basis-full">
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        <div className="basis-1/5 md:hidden">
          <div className="text-xs uppercase text-white">Popular</div>
          {popularPosts.map((post) => (
            <Link key={post._id} to={`/posts/${post._id}`}>
              <PopularPost post={post} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
