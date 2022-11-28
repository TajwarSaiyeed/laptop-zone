import React, { useContext } from "react";
import { BsCartPlus, BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdReport } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const Advertisement = ({ product, handleReport, setSelectProduct }) => {
  const { user } = useContext(AuthContext);
  const { productName, productImage, price, originalPrice } = product.product;
  const { isBooked, _id } = product;

  return (
    <div className="carousel-item relative w-96">
      <div className="absolute bottom-2  p-2">
        {user?.email ? (
          <div className="card-actions">
            <label
              htmlFor="advertiseAddToCart"
              className={`${
                isBooked && "btn-disabled btn-outline"
              } flex gap-4 justify-center items-center btn btn-primary`}
              onClick={() => setSelectProduct(product)}
            >
              {!isBooked ? (
                <BsCartPlus fontSize={24} />
              ) : (
                <BsFillBookmarkHeartFill fontSize={24} />
              )}
              {isBooked ? "Booked" : "Add to Card"}
            </label>
            {!isBooked && (
              <button
                onClick={() => handleReport(_id)}
                title="report"
                className={`btn btn-error`}
              >
                <MdReport fontSize={24} />
              </button>
            )}
            <h1 className="uppercase bg-cyan-800 text-white w-full font-bold p-2 rounded-md text-xl ">
              {productName}
            </h1>
            <Link
              to={`/payment/${_id}`}
              state={{ query: product.product }}
              className="flex gap-4 justify-center items-center w-full btn btn-success"
            >
              <RiMoneyDollarCircleFill fontSize={24} /> {price}
              <del className="text-red-500">{originalPrice}</del>
            </Link>
          </div>
        ) : (
          <Link className="btn btn-primary" to="/login">
            Please Login
          </Link>
        )}
      </div>
      <img alt="img" src={productImage} className="rounded-box w-full" />
    </div>
  );
};

export default Advertisement;
