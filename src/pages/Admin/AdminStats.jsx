import React from "react";
import useUsers from "./useUsers";

const AdminStats = () => {
  const users = useUsers();
  const sellers = users.filter((user) => user.role === "seller");
  const buyers = users.filter((user) => user.role === "buyer");
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
      <div className="stat">
        <div className="stat-title">All Users</div>
        <div className="stat-value">{users?.length}</div>
        <div className="stat-desc">Jan 1st - Feb 1st</div>
      </div>

      <div className="stat">
        <div className="stat-title">All Seller</div>
        <div className="stat-value">{sellers?.length}</div>
        <div className="stat-desc">↗︎ 400 (22%)</div>
      </div>

      <div className="stat">
        <div className="stat-title">All Buyers</div>
        <div className="stat-value">{buyers?.length}</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
      </div>
    </div>
  );
};

export default AdminStats;
