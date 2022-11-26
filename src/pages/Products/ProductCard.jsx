import React from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";
import { MdDateRange, MdReport, MdSell } from "react-icons/md";
import { BsCartPlus, BsCheckCircle } from "react-icons/bs";
import { FaMobile } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { FcViewDetails } from "react-icons/fc";
const ProductCard = ({ product }) => {
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
  const { sellerName } = product;
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="p-5">
        <img src={productImage} alt="Shoes" />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h2 className="card-title">{productName}</h2>
          <button title="Add To WishList" className="btn btn-primary">
            <AiOutlineFolderAdd fontSize={24} />
          </button>
        </div>
        <p>{details}</p>
        <div className="card-actions justify-end">
          <button className="flex gap-4 justify-center items-center btn btn-success btn-outline">
            <BsCartPlus fontSize={24} />
            Add to Card
          </button>
          <button title="report" className="btn btn-outline btn-error">
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
          <MdDateRange /> &nbsp; {yearOfUse}
        </p>
        <p className="flex items-center">
          <GrMapLocation /> &nbsp; {location}
        </p>
        <p className="flex items-center">
          <FcViewDetails /> &nbsp; {productCondition}
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
