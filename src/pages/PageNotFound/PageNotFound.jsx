import React from "react";
import { Link } from "react-router-dom";
import nope from "../../assets/404.png";

const PageNotFound = () => {
  return (
    <div className="relative">
      <img src={nope} className="w-full h-screen blur-sm" alt="" />
      <div className="absolute h-screen flex justify-center items-center top-0 left-1/2 -translate-x-1/2">
        <Link className="btn btn-warning btn-wide text-white" to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
