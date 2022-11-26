import React from "react";
import { Link } from "react-router-dom";

const LaptopCategory = ({ laptopCategory }) => {
  const { _id, image, categoryName, description } = laptopCategory;
  return (
    <Link
      className="card w-96 bg-base-100 cursor-pointer shadow-xl image-full"
      to={`/category/${_id}`}
      state={{ query: categoryName, id: _id }}
    >
      <figure>
        <img src={image} className="w-full h-full" alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{categoryName}</h2>
        <p className="text-justify">{description}</p>
      </div>
    </Link>
  );
};

export default LaptopCategory;
