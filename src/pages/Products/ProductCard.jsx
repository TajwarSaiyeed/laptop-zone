import React from "react";
import { MdDateRange, MdReport, MdSell } from "react-icons/md";
import { BsCalendar2DateFill, BsCartPlus, BsCheckCircle } from "react-icons/bs";
import { FaMobile } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FcViewDetails } from "react-icons/fc";
const ProductCard = ({ product, handleReport, setSelectProduct }) => {
  const {
    productName,
    productImage,
    price,
    originalPrice,
    yearOfUse,
    productCondition,
    location,
    mobile,
    details,
  } = product.product;
  const { sellerName, _id, uploadDate } = product;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="p-5">
        <img src={productImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{productName}</h2>

        <p>{details}</p>
        <div className="card-actions justify-end">
          <label
            htmlFor="addToCart"
            className="flex gap-4 justify-center items-center btn btn-success btn-outline"
            onClick={() => setSelectProduct(product)}
          >
            <BsCartPlus fontSize={24} />
            Add to Card
          </label>
          <button
            onClick={() => handleReport(_id)}
            title="report"
            className="btn btn-outline btn-error"
          >
            <MdReport fontSize={24} />
          </button>
        </div>
        <div className="badge badge-primary">
          <MdSell /> &nbsp; {sellerName} &nbsp; <BsCheckCircle />
        </div>
        <p className="flex items-center">
          <FaMobile /> &nbsp; {mobile}
        </p>
        <p className="flex items-center">
          <MdDateRange /> &nbsp; {yearOfUse} years
        </p>
        <p className="flex items-center">
          <GrMapLocation /> &nbsp; {location}
        </p>
        <p className="flex items-center">
          <FcViewDetails /> &nbsp; {productCondition}
        </p>
        <p className="flex items-center">
          <BsCalendar2DateFill />
          &nbsp; Posted:&nbsp;{uploadDate}
        </p>
        <button className="flex gap-4 justify-center items-center btn btn-success btn-outline">
          <RiMoneyDollarCircleFill fontSize={24} /> {price}
          <del className="text-red-500">{originalPrice}</del>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
