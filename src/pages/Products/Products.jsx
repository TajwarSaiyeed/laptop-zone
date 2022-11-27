import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddToCart from "./AddToCart";
import ProductCard from "./ProductCard";
import Loading from "../../components/Loading";

const Products = () => {
  const { state } = useLocation();

  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", state?.id],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/category/${state?.id}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });
  const handleReport = (id) => {
    fetch(`${process.env.REACT_APP_SERVER}/products?id=${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Product Reported");
          refetch();
        }
      });
  };

  const [selectProduct, setSelectProduct] = useState(null);
  if (selectProduct) {
    refetch();
  }
  if (isLoading) <Loading />;

  return (
    <div className="my-6">
      {products.length > 0 ? (
        <>
          <h1 className="text-3xl">All Products of {state?.query}</h1>
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
      {selectProduct && (
        <AddToCart
          refetch={refetch}
          setSelectProduct={setSelectProduct}
          selectProduct={selectProduct}
        />
      )}
    </div>
  );
};

export default Products;
