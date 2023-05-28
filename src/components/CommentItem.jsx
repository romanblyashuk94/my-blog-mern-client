import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { removeComment } from "../redux/features/comments/commentsSlice";

function CommentItem({ comment }) {
  const dispatch = useDispatch();
  const { user: currentAuthUser } = useSelector((state) => state.auth);

  const isMyComment = currentAuthUser?._id === comment.author._id;

  const handleDelete = () => {
    try {
      dispatch(removeComment(comment._id));
    } catch (error) {
      toast.error("Can't delete comment");
    }
  };

  console.log(comment);
  return (
    <li>
      <div className="flex justify-between text-white text-sm">
        <span className="text-sm">{comment.author.username}:</span>
        {isMyComment && (
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 opacity-50"
          >
            <AiFillDelete />
          </button>
        )}
      </div>
      <div className="flex text-gray-300 text-[12px]">{comment.comment}</div>
    </li>
  );
}

export default CommentItem;
