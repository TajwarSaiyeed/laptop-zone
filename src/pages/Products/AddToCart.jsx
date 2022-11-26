import React from "react";

const AddToCart = ({ selectProduct }) => {
  const { productName } = selectProduct.product;
  console.log(selectProduct);
  return (
    <>
      <input type="checkbox" id="addToCart" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="addToCart"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{productName}</h3>
          <p className="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
