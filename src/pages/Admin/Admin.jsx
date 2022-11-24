import React from "react";
import AdminStats from "./AdminStats";

const Admin = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="hidden justify-evenly items-center lg:flex h-52 w-full">
        <h1 className="text-5xl uppercase font-bold">Tajwar Saiyeed</h1>
        <div className="avatar">
          <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src="https://i.ibb.co/F0b7dRw/doc1.jpg" alt="" />
          </div>
        </div>
      </div>
      <div className="w-full">
        <AdminStats />
      </div>
    </div>
  );
};

export default Admin;
