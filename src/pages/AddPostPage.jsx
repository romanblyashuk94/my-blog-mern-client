import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { createPost } from "../redux/features/posts/postsSlice";

function AddPostPage(props) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("title", title);
      data.append("text", text);
      data.append("image", image);

      dispatch(createPost(data));

      toast.success("Post was added");

      setTitle("");
      setText("");
      setImage("");
    } catch (error) {
      toast.error("Can't create post");
    }
  };

  const handleClearForm = (e) => {
    e.preventDefault();

    setTitle("");
    setText("");
    setImage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleClearForm}
      className="w-1/3 mx-auto py-10"
    >
      <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer">
        Add image:
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          className="hidden"
        />
      </label>

      <div className="flex object-cover py-2">
        {image && <img src={URL.createObjectURL(image)} alt={image.name} />}
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
          Add Post
        </button>

        <button
          type="reset"
          className="flex items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4"
        >
          Reset
        </button>
      </div>
    </form>
  );
}

export default AddPostPage;
