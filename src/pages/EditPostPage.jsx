import axios from "../utils/axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../redux/features/posts/postsSlice";

function EditPostPage(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [newImage, setNewImage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`);

    setTitle(data?.post.title);
    setText(data?.post.text);
    setOldImage(data?.post.imageUrl);
  }, [params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = new FormData();

    updatedPost.append("id", params.id);
    updatedPost.append("title", title);
    updatedPost.append("text", text);
    updatedPost.append("imageUrl", newImage || oldImage);

    dispatch(updatePost(updatedPost));
    navigate(-1);
  };

  const handleClearForm = () => {
    navigate(-1);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
    setOldImage("");
  };

  useEffect(() => {
    try {
      fetchPost();
    } catch (error) {
      console.log(error);
    }
  }, [fetchPost]);

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleClearForm}
      className="w-1/3 mx-auto py-10"
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        {oldImage || newImage ? "Change image" : "Add image"}
        <input onChange={handleImageChange} type="file" className="hidden" />
      </label>

      <div className="flex object-cover py-2">
        {oldImage && (
          <img
            src={`https://my-blog-mern-server-y8s3.onrender.com/${oldImage}`}
            alt={oldImage.name}
          />
        )}

        {newImage && (
          <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
        )}
      </div>

      <label className="text-xs text-white opacity-70">
        Post title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-white opacity-70">
        Post text:
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Post text"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none resize-none h-40 placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 items-center justify-center mt-4">
        <button className="flex items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">
          Change post
        </button>

        <button
          type="reset"
          className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditPostPage;
