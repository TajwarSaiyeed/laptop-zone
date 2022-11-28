import React from "react";
import { useQuery } from "@tanstack/react-query";

const AdminMessages = () => {
  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_SERVER}/messages/`, {
          headers: {
            authorization: `bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await res.json();
        return data;
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="flex flex-col gap-2">
      {messages.map((message) => (
        <div
          className="max-w-96 max-h-96 bg-slate-100 rounded-xl p-5"
          key={message._id}
        >
          <h1>Name : {message.name}</h1>
          <p>Message Holer Email: {message.email}</p>
          <p>Message: {message.message}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminMessages;
