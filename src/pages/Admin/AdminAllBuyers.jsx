import React from "react";
import toast from "react-hot-toast";
import { AiOutlineUserDelete } from "react-icons/ai";
import useUsers from "./useUsers";

const AdminAllBuyers = () => {
  const { users, refetch } = useUsers();
  const buyers = users.filter((user) => user.role === "buyer");

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
          toast.success("Buyer Removed SuccessFully");
          refetch();
        }
      });
  };
  return (
    <>
      {buyers.length > 0 ? (
        <div>
          <h1 className="text-xl lg:text-5xl md:text-3xl">All Buyers</h1>
          <div className="overflow-x-auto mt-5">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {buyers &&
                  buyers?.map((buyer, i) => (
                    <tr key={buyer._id}>
                      <th>{i + 1}</th>
                      <td>{buyer?.name}</td>
                      <td>{buyer?.email}</td>
                      <td className="uppercase font-bold text-primary">
                        {buyer.role}
                      </td>
                      <td>
                        <button onClick={() => handleDelete(buyer?._id)}>
                          <AiOutlineUserDelete className="text-red-500 text-4xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <h1 className="text-3xl">No Buyers Available!!</h1>
        </div>
      )}
    </>
  );
};

export default AdminAllBuyers;
