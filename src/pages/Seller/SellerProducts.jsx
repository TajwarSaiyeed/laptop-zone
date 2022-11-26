import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useProducts } from "./useProducs";

const SellerProducts = () => {
  const { user } = useContext(AuthContext);
  const { products } = useProducts(user);

  return (
    <>
      {products.length > 0 ? (
        <div>
          <h1 className="text-xl lg:text-5xl md:text-3xl">My Products</h1>
          <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 justify-items-center p-10 ">
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
                  className="w-full p-5  bg-slate-100 rounded-xl"
                >
                  <div className="w-full min-h-96 h-96">
                    <img className="w-full h-full" src={productImage} alt="" />
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
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <h1 className="text-4xl">You Have No Products</h1>
        </div>
      )}
    </>
  );
};

export default SellerProducts;
