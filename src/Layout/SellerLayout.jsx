import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

const SellerLayout = () => {
  return (
    <div className="lg:px-5">
      <Navbar />
      <div className="avatar lg:hidden justify-center items-center w-full gap-3 h-96 flex flex-col">
        <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="https://i.ibb.co/F0b7dRw/doc1.jpg" alt="" />
        </div>
        <h1 className="text-xl font-bold">Tajwar Saiyeed</h1>
        <h6 className="text-green-300 font-black text-5xl uppercase">Seller</h6>
      </div>
      <div className="hidden justify-evenly items-center lg:flex h-52 w-full">
        <div>
          <h1 className="text-5xl uppercase font-bold">Tajwar Saiyeed</h1>
          <h6 className="text-green-300 font-black text-5xl uppercase">
            Seller
          </h6>
        </div>
        <div className="avatar">
          <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://i.ibb.co/F0b7dRw/doc1.jpg" alt="" />
          </div>
        </div>
      </div>

      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
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
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact lg:hidden dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/user/seller">Profile</Link>
              </li>
              <li>
                <Link to="/user/seller/addaproduct">Add A Product</Link>
              </li>
              <li>
                <Link to="/user/seller/myproducts">My Products</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul className="hidden my-3 mb-5 lg:flex w-full justify-center items-center gap-10">
        <li>
          <Link className="btn btn-primary" to="/user/seller">
            Profile
          </Link>
        </li>
        <li>
          <Link className="btn btn-primary" to="/user/seller/addaproduct">
            Add A Product
          </Link>
        </li>
        <li>
          <Link className="btn btn-primary" to="/user/seller/myproducts">
            My Products
          </Link>
        </li>
      </ul>
      <div className="min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer />
    </div>
  );
};

export default SellerLayout;
