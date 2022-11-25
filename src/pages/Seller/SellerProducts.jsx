import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthProvider";

const SellerProducts = () => {
  const { user } = useContext(AuthContext);
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/products?email=${user?.email}`
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  console.log(products);
  return (
    <div>
      <h1 className="text-xl lg:text-5xl md:text-3xl">My Products</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center p-10">
        {products.map((product) => {
          const {
            categoryName,
            originalPrice,
            price,
            yearOfUse,
            productName,
            productImage,
            productCondition,
            details,
          } = product.product;
          return (
            <div
              key={product._id}
              className="w-3/4 p-5 border border-black rounded-xl"
            >
              <div className="w-full h-96">
                <img src={productImage} alt="" />
              </div>
              <div>
                <div className="overflow-x-auto">
                  <table className="table table-zabra w-full">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Product Category</td>
                        <td>{categoryName}</td>
                      </tr>
                      <tr>
                        <td>Product Name</td>
                        <td>{productName}</td>
                      </tr>
                      <tr>
                        <td>Product Price</td>
                        <td>${price}</td>
                      </tr>
                      <tr>
                        <td>Original Price</td>
                        <td>${originalPrice}</td>
                      </tr>
                      <tr>
                        <td>Product Condition</td>
                        <td>{productCondition}</td>
                      </tr>
                      <tr>
                        <td>Details</td>
                        <td>{details}</td>
                      </tr>
                      <tr>
                        <td>Years Of Use</td>
                        <td>{yearOfUse} year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerProducts;
