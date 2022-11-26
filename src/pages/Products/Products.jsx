import React from "react";
import { useLoaderData, useLocation } from "react-router-dom";
import ProductCard from "./ProductCard";

const Products = () => {
  const products = useLoaderData();
  const { state } = useLocation();

  return (
    <div className="my-6">
      <h1 className="text-3xl">All Products of {state.query}</h1>
      <div className="my-3 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2 justify-items-center">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
