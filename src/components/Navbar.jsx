import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";

function Navbar() {
  const isAuth = useSelector(checkIsAuth);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeStles = {
    color: "white",
  };

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex py-4 justify-between items-center">
      <Link to="/">
        <span className="flex justify-center items-center w-15 h-15 bg-gray-600 text-xl text-white rounded-sm p-2">
          MyBlog
        </span>
      </Link>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/"
              className="text-xs text-gray-400 hover:text-white hover:cursor-pointer"
              style={({ isActive }) => (isActive ? activeStles : undefined)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/posts/me"
              className="text-xs text-gray-400 hover:text-white hover:cursor-pointer"
              style={({ isActive }) => (isActive ? activeStles : undefined)}
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/new"
              className="text-xs text-gray-400 hover:text-white hover:cursor-pointer"
              style={({ isActive }) => (isActive ? activeStles : undefined)}
            >
              Add Post
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex gap-5 justify-center items-center text-xs text-white rounded-sm">
        {isAuth ? (
          <>
            <span className="text-white">{user?.username || ""}</span>
            <button onClick={handleLogout} className="p-4  bg-gray-600">
              Sign out
            </button>
          </>
        ) : (
          <Link to="login" className="p-4 bg-gray-600">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
