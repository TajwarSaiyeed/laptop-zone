import React from "react";
import useUsers from "./useUsers";
import { AiOutlineUserDelete } from "react-icons/ai";
import { GoVerified } from "react-icons/go";
import toast from "react-hot-toast";

const AdminAllSellers = () => {
  const { users, refetch } = useUsers();
  const sellers = users.filter((user) => user.role === "seller");

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_SERVER}/users/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Seller Removed SuccessFully");
          refetch();
        }
      });
  };

  const handleVerified = (email) => {
    fetch(`${process.env.REACT_APP_SERVER}/users?email=${email}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Seller Verified");
          refetch();
        }
      });
  };

  return (
    <>
      {sellers.length > 0 ? (
        <div>
          <h1 className="text-xl lg:text-5xl md:text-3xl">All Sellers</h1>
          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                  <th>Verify</th>
                </tr>
              </thead>
              <tbody>
                {sellers &&
                  sellers?.map((seller, i) => (
                    <tr key={seller._id}>
                      <th>{i + 1}</th>
                      <td>{seller?.name}</td>
                      <td>{seller?.email}</td>
                      <td className="uppercase font-bold text-success">
                        {seller?.role}
                      </td>
                      <td>
                        <button onClick={() => handleDelete(seller?._id)}>
                          <AiOutlineUserDelete className="text-red-500 text-4xl" />
                        </button>
                      </td>
                      <td>
                        {seller?.verified === true ? (
                          <p className="text-success font-bold">Verified</p>
                        ) : (
                          <button onClick={() => handleVerified(seller?.email)}>
                            <GoVerified className="text-blue-500 hover:text-blue-800 text-4xl" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <h1 className="text-3xl">No Sellers Available!!</h1>
        </div>
      )}
    </>
  );
};

export default AdminAllSellers;
