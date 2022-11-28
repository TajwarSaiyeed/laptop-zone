import React, { useContext, useState } from "react";
import Loading from "../../components/Loading";
import { AuthContext } from "../../contexts/AuthProvider";
import { useProducts } from "./useProducts";
import { FcAdvertising } from "react-icons/fc";
import axios from "axios";
import toast from "react-hot-toast";
import SmallLoading from "../../components/SmallLoading";

const SellerProducts = () => {
  const { user } = useContext(AuthContext);
  const { products, isLoading, refetch } = useProducts(user);
  const [advertiseLoading, setAdvertiseLoading] = useState(false);
  // delete product
  const handleDeleteMyProduct = (id, productName) => {
    const confirmation = window.prompt(
      `Are you sure to delete ${productName}. Please Type ${productName}`
    );
    if (confirmation === productName) {
      axios
        .delete(`${process.env.REACT_APP_SERVER}/products?id=${id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((data) => {
          if (data.data.acknowledged) {
            toast.success("Your Product Deleted!!");
            refetch();
          }
        });
    }
  };

  const handleAdvertise = (id) => {
    setAdvertiseLoading(true);
    fetch(`${process.env.REACT_APP_SERVER}/advertiseProduct?id=${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setAdvertiseLoading(false);
          toast.success("Your Product Advertised!!");
          refetch();
        }
      });
  };

  if (isLoading) <Loading />;
  return (
    <>
      {products.length > 0 ? (
        <div>
          <h1 className="text-xl lg:text-5xl md:text-3xl">My Products</h1>
          <div className="grid gap-3 grid-cols-1 lg:grid-cols-2 justify-items-center p-10 ">
            {products.map((product) => {
              const {
                originalPrice,
                price,
                yearOfUse,
                productName,
                productImage,
                productCondition,
                details,
              } = product.product;
              const { categoryName, _id, sold } = product;
              console.log(product);
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
                    <div className="flex justify-between mt-4">
                      {!sold ? (
                        <button
                          onClick={() => handleAdvertise(product._id)}
                          className="text-xl btn btn-outline btn-success btn-wide"
                        >
                          {advertiseLoading ? (
                            <SmallLoading />
                          ) : (
                            <>
                              <FcAdvertising className="mr-2" fontSize={30} />
                              Advertise
                            </>
                          )}
                        </button>
                      ) : (
                        <p className="btn  btn-primary">Sold</p>
                      )}
                      <button
                        onClick={() => handleDeleteMyProduct(_id, productName)}
                        className="btn btn-outline btn-error"
                      >
                        delete
                      </button>
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
