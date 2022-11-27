import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer";
import Navbar from "../pages/shared/Navbar";

const Main = () => {
  return (
    <div className="lg:px-10 px-5">
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Main;
