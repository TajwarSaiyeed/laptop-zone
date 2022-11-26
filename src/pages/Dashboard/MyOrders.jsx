import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../contexts/AuthProvider";
import { FaStripe } from "react-icons/fa";
import Loading from "../../components/Loading";
const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const { data: myorders = [], isLoading } = useQuery({
    queryKey: ["myorders"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/orders?email=${user?.email}`,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err.message);
      }
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {myorders.length > 0 ? (
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Price</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {myorders.map((myorder) => (
                <tr key={myorder._id}>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={myorder.productImage}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{myorder.productName}</td>
                  <td>${myorder.price}</td>
                  <td>
                    <button className="flex gap-3 btn btn-outline btn-success">
                      <FaStripe fontSize={30} /> Pay
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-xl md:text-2xl lg:text-3xl">
            No Orders Available !!
          </h1>
        </div>
      )}
    </>
  );
};

export default MyOrders;
