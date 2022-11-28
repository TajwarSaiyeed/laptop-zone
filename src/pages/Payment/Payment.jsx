import React from "react";
import { Link, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const { state } = useLocation();
  const { productName, price, productImage } = state.query;
  return (
    <div className="my-5 gap-5 flex flex-col w-full justify-center items-center">
      <Link to="/" className="btn btn-wide btn-warning">
        Back To Home
      </Link>
      <div className="flex flex-col gap-5 min-h-screen justify-around lg:w-3/4 items-center lg:flex-row">
        <div className="w-full lg:w-1/2 md:w-full lg:p-5 flex flex-col justify-center items-center">
          <div className="h-96 w-96">
            <img
              src={productImage}
              className="rounded-lg w-full h-full shadow-2xl"
              alt=""
            />
          </div>
          <div className="mt-5">
            <h1 className="text-2xl uppercase font-bold">
              Product Name: {productName}
            </h1>
            <p className="text-2xl font-bold">Price: ${price}</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 md:w-full h-96">
          <div className="mb-5">
            <h3 className="text-3xl">Payment for {productName}</h3>
            <p className="text-xl">
              Please Pay <strong className="text-error">${price}</strong> for
              Your Product{" "}
              <span className="text-green-500 font-black">{productName}</span>
            </p>
          </div>
          <Elements stripe={stripePromise}>
            <CheckOutForm product={state.query} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
