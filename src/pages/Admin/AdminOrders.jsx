import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaStripe } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/Loading";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
const AdminOrders = () => {
  const { user } = useContext(AuthContext);
  const {
    data: myorders = [],
    isLoading,
    refetch,
  } = useQuery({
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

  const handleDeleteMyOrder = (id, bookId, productName) => {
    const confirmation = window.prompt(
      `Are You Sure To Delete Your ${productName}. Please Type it : ${productName}`
    );
    if (confirmation === productName) {
      axios
        .delete(`${process.env.REACT_APP_SERVER}/orders?id=${id}`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((data) => {
          if (data.data.acknowledged) {
            toast.success("Your Order Deleted!!");
            fetch(`${process.env.REACT_APP_SERVER}/revokeOrder?id=${bookId}`, {
              method: "PUT",
              headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
            })
              .then((res) => res.json())
              .then((data) => {
                refetch();
              });
          }
        });
    }
  };

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
                <th>Cancel</th>
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
                    {myorder.price && !myorder?.paid && (
                      <Link
                        to={`/payment/${myorder._id}`}
                        state={{ query: myorder }}
                        className="flex gap-3 btn btn-outline btn-success"
                      >
                        <FaStripe fontSize={30} /> Pay
                      </Link>
                    )}
                    {myorder.price && myorder.paid && (
                      <span className="text-success text-bold uppercase">
                        Paid
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() =>
                        handleDeleteMyOrder(
                          myorder._id,
                          myorder.bookId,
                          myorder.productName
                        )
                      }
                      className="flex gap-3 btn-outline btn btn-error"
                    >
                      <GiCancel fontSize={30} />
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

export default AdminOrders;
