import React from "react";

const LaptopCategory = ({ laptopCategory }) => {
  const { id, image, categoryName, description } = laptopCategory;
  return (
    <div
      onClick={() => console.log(id)}
      className="card w-96 bg-base-100 shadow-xl image-full"
    >
      <figure>
        <img src={image} className="w-full h-full" alt="" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{categoryName}</h2>
        <p className="text-justify">{description}</p>
      </div>
    </div>
  );
};

export default LaptopCategory;
