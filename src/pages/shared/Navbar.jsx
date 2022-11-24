import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import logo from "../../assets/fav.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const signout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };
  const menuItems = (
    <React.Fragment>
      <li>
        <Link className="btn btn-ghost" to="/">
          Home
        </Link>
      </li>
      <li>
        {user?.email ? (
          <>
            <Link className="btn btn-ghost" to="/dashboard">
              Dashboard
            </Link>
            <button onClick={signout} className="btn btn-error">
              Logout
            </button>
          </>
        ) : (
          <Link className="btn btn-warning rounded" to="/login">
            Login
          </Link>
        )}
      </li>
    </React.Fragment>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={1}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost gap-3 normal-case text-xl">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={logo} alt="" />
            </div>
          </div>
          Laptop Zone
        </Link>
      </div>
      <div className="hidden lg:navbar-end lg:flex">
        <ul className="menu menu-horizontal p-0">{menuItems}</ul>
      </div>
      {user && (
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="https://placeimg.com/80/80/people" alt="" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a href="/" className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a href="/">Settings</a>
            </li>
            <li>
              <a href="/">Logout</a>
            </li>
          </ul>
        </div>
      )}
      <div className="navbar-end lg:hidden">
        <label
          htmlFor="dashboard-drawer"
          tabIndex={0}
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
