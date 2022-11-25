import React from "react";
import useUsers from "./useUsers";
import { AiOutlineUserDelete } from "react-icons/ai";
import { GoVerified } from "react-icons/go";

const AdminAllSellers = () => {
  const users = useUsers();
  const sellers = users.filter((user) => user.role === "seller");

  return (
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
                    <button>
                      <AiOutlineUserDelete className="text-red-500 text-4xl" />
                    </button>
                  </td>
                  <td>
                    <button>
                      <GoVerified className="text-blue-500 hover:text-blue-800 text-4xl" />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllSellers;
