import React from "react";
import { Link, useLocation } from "react-router-dom";

const Payment = () => {
  const { state } = useLocation();
  const { productName, price, productImage } = state.query;
  return (
    <div className="my-5 flex flex-col justify-center items-center">
      <Link to="/" className="btn btn-wide btn-warning">
        Home
      </Link>
      <div className="flex flex-col justify-center items-center lg:flex-row">
        <div className="w-full lg:w-1/2 md:w-full lg:p-5 flex flex-col justify-center items-center">
          <img src={productImage} className="rounded-lg  shadow-2xl" alt="" />
          <h1 className="text-2xl uppercase font-bold">
            Product Name: {productName}
          </h1>
          <p className="text-2xl font-bold">Price: ${price}</p>
        </div>
        <div className="w-full lg:w-1/2 md:w-full">
          <img src={productImage} className="rounded-lg  shadow-2xl" alt="" />
          <h1 className="text-2xl uppercase font-bold">
            Product Name: {productName}
          </h1>
          <p className="text-2xl font-bold">Price: ${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Payment;
