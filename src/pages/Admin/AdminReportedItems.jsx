import React from "react";
import { useQuery } from "@tanstack/react-query";
import { MdRemoveCircle } from "react-icons/md";
import { toast } from "react-hot-toast";

const AdminReportedItems = () => {
  const { data: reportedProducts = [], refetch } = useQuery({
    queryKey: ["reportedProducts"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/reportedProducts`,
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

  const handleRemove = (id) => {
    fetch(`${process.env.REACT_APP_SERVER}/reportedProducts?id=${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Reported Item SuccessFully");
          refetch();
        }
      });
  };

  return (
    <div>
      <h1 className="text-xl lg:text-5xl md:text-3xl">Reported Items</h1>
      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reportedProducts &&
              reportedProducts?.map((reportedProduct, i) => {
                return (
                  <tr key={reportedProduct._id}>
                    <th>{i + 1}</th>
                    <td>{reportedProduct?.product?.productName}</td>

                    <td>
                      <button
                        onClick={() => handleRemove(reportedProduct?._id)}
                      >
                        <MdRemoveCircle className="text-red-500 text-4xl" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportedItems;
