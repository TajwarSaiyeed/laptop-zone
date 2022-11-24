import React from "react";

const LaptopCategory = ({ laptopCategory }) => {
  const { image, categoryName, description } = laptopCategory;
  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full">
      <figure>
        <img src={image} className="w-full h-full" alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{categoryName}</h2>
        <p className="text-justify">{description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default LaptopCategory;
