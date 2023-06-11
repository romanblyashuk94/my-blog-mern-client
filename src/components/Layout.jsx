import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Loader from "./Loader";

function Layout({ children }) {
  const { auth, comments, posts } = useSelector((state) => state);

  const isLoading = auth.isLoading || comments.isLoading || posts.isLoading;

  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
      {isLoading && <Loader />}
    </>
  );
}

export default Layout;
