import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "../pages/shared/Navbar";

const AdminLayout = () => {
  return (
    <div className="lg:px-5">
      <Navbar />
      <div className="drawer drawer-mobile drawer-end">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content px-5 py-3">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100  text-base-content">
            <li>
              <Link to="/user/admin">Profile</Link>
            </li>
            <li>
              <Link to="/user/admin/allSellers">All Sellers</Link>
            </li>
            <li>
              <Link to="/user/admin/allBuyers">All Buyers</Link>
            </li>
            <li>
              <Link to="/user/admin/report">Reported Items</Link>
            </li>
            <div className="avatar lg:hidden justify-center items-center w-full gap-3 h-96 flex flex-col">
              <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://i.ibb.co/F0b7dRw/doc1.jpg" alt="" />
              </div>
              <h1 className="text-xl font-bold">Tajwar Saiyeed</h1>
              <h6 className="text-green-300 font-black text-5xl uppercase">
                Admin
              </h6>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
