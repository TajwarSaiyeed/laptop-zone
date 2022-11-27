import React from "react";
import { BsCartPlus, BsFillBookmarkHeartFill } from "react-icons/bs";
import { MdReport } from "react-icons/md";

const Advertisement = ({ product, handleReport, setSelectProduct }) => {
  const { productName, productImage } = product.product;
  const { isBooked, _id } = product;
  return (
    <div className="carousel-item relative w-96">
      <div className="absolute bottom-16  left-2 p-2">
        <h1 className="uppercase text-black bg-cyan-300 mb-2 p-1 rounded-md text-xl font-bold">
          {productName}
        </h1>
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
              className={`btn btn-outline btn-error`}
            >
              <MdReport fontSize={24} />
            </button>
          )}
        </div>
      </div>
      <img alt="img" src={productImage} className="rounded-box" />
    </div>
  );
};

export default Advertisement;
