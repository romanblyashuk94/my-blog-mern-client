import React from "react";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
    </>
  );
}

export default Layout;
