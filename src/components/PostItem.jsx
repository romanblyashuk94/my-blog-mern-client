import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Moment from "react-moment";
import { toast } from "react-toastify";
import {
  AiFillEye,
  AiOutlineMessage,
  AiTwotoneEdit,
  AiFillDelete,
} from "react-icons/ai";
import { removePost } from "../redux/features/posts/postsSlice";
import { Link, useNavigate } from "react-router-dom";

function PostItem({ post }) {
  const {
    _id,
    title,
    text,
    imageUrl,
    username,
    createdAt,
    views,
    author,
    comments,
  } = post;
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    try {
      dispatch(removePost(_id));
      toast.success("Post was deleted");
    } catch (error) {
      toast.error("Can't remove this post");
    }
  };

  return (
    <div>
      <Link
        to={`/posts/${post._id}`}
        className="flex flex-col basis-1/4 flex-grow"
      >
        <div className={imageUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}>
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
        <p className="text-white opacity-60 text-xs pt-4 line-clamp-3">
          {text}
        </p>
      </Link>

      <div className="flex gap-3 items-center justify-between mt-2">
        <Link to={`/posts/${post._id}`} className="flex gap-3 mt-4">
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiFillEye /> <span>{views}</span>
          </button>
          <button className="flex items-center justify-center gap-2 text-xs text-white opacity-50">
            <AiOutlineMessage /> <span>{comments.length}</span>
          </button>
        </Link>

        {user?._id === author && (
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate(`/posts/${_id}/edit`)}
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
  );
}

export default PostItem;
