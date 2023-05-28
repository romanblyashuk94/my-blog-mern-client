import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createComment } from "../redux/features/comments/commentsSlice";
import { useParams } from "react-router-dom";

function CommentForm() {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const params = useParams();

  const handleSubbmit = (e) => {
    e.preventDefault();

    try {
      const newComment = new FormData();

      newComment.append("postId", params.id);
      newComment.append("comment", comment);

      dispatch(createComment(newComment));

      setComment("");
    } catch (error) {
      toast.error("Can't send comments");
    }
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubbmit}>
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        type="text"
        placeholder="Comment"
        className="text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700"
      />
      <button
        type="submit"
        className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4"
      >
        Send
      </button>
    </form>
  );
}

export default CommentForm;
