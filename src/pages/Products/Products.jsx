import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useLocation } from "react-router-dom";
import AddToCart from "./AddToCart";
import ProductCard from "./ProductCard";

const Products = () => {
  const products = useLoaderData();
  const { state } = useLocation();

  const handleReport = (id) => {
    console.log(id);

    fetch(`${process.env.REACT_APP_SERVER}/products?id=${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Product Reported");
        }
      });
  };

  const [selectProduct, setSelectProduct] = useState(null);

  return (
    <div className="my-6">
      {products.length > 0 ? (
        <>
          <h1 className="text-3xl">All Products of {state.query}</h1>
          <div className="my-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 justify-items-center">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleReport={handleReport}
                setSelectProduct={setSelectProduct}
              />
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-xl">No Products Available</h1>
        </div>
      )}
      {selectProduct && <AddToCart selectProduct={selectProduct} />}
    </div>
  );
};

export default Products;
