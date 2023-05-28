import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Moment from "react-moment";
import {
  AiFillDelete,
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
} from "react-icons/ai";
import axios from "../utils/axios";
import CommentForm from "../components/CommentForm";
import { useDispatch, useSelector } from "react-redux";
import {
  clearComments,
  getPostComments,
} from "../redux/features/comments/commentsSlice";
import CommentItem from "../components/CommentItem";
import { removePost } from "../redux/features/posts/postsSlice";
import { toast } from "react-toastify";

function PostPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [post, setPost] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { comments: postComments } = useSelector((state) => state.comments);

  const handleGoBack = () => navigate(-1);

  const handleDelete = () => {
    try {
      dispatch(removePost(post._id));
      toast.success("Post was deleted");

      setTimeout(() => navigate(-1), 1000);
    } catch (error) {
      toast.error("Can't remove this post");
    }
  };

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);

    setPost(data?.post);
  }, [params.id]);

  useEffect(() => {
    try {
      fetchPost();
      dispatch(getPostComments(params.id));
    } catch (error) {
      console.log(error);
    }

    return () => dispatch(clearComments());
  }, [fetchPost, dispatch, params.id]);

  if (!post) {
    return <div></div>;
  }

  const { imageUrl, createdAt, username, title, views, text, comments } = post;

  return (
    <div>
      <button
        onClick={handleGoBack}
        className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
      >
        Go back
      </button>

      <div className="flex gap-10 py-8">
        <div className="w-2/3">
          <div className="flex flex-col basis-1/4 flex-grow">
            <div
              className={imageUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}
            >
              {imageUrl && (
                <img
                  src={`http://localhost:3002/${imageUrl}`}
                  alt={imageUrl}
                  className="object-cover w-full"
                />
              )}
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="text-xs text-white opacity-50">{username}</div>
              <div className="text-xs text-white opacity-50">
                <Moment date={createdAt} format="D MMM YYYY" />
              </div>
            </div>
            <h3 className="text-white text-xl">{title}</h3>
            <p className="text-white opacity-60 text-xs pt-4">{text}</p>
            <div className="flex gap-3 items-center justify-between mt-2">
              <div className="flex gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiFillEye /> <span>{views}</span>
                </button>
                <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
                  <AiOutlineMessage /> <span>{comments.length}</span>
                </button>
              </div>

              {user?._id === post.author && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => navigate(`/posts/${post._id}/edit`)}
                    className="flex items-center justify-center gap-2 text-white opacity-50"
                  >
                    <AiTwotoneEdit />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex items-center justify-center gap-2 text-white opacity-50"
                  >
                    <AiFillDelete />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm">
          {user && <CommentForm postId={post._ids} />}
          {postComments.map((comment) => (
            <CommentItem key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
