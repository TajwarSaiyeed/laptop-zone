import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import AdminStats from "./AdminStats";

const Admin = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="hidden justify-evenly items-center lg:flex h-52 w-full">
        <h1 className="text-5xl uppercase font-bold">{user?.displayName}</h1>
        <div className="avatar">
          <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={user?.photoURL} alt="" />
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
