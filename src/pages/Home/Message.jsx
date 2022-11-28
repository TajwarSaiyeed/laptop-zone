import React, { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";

const Message = () => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    const fullMessage = {
      name,
      email,
      message,
    };

    fetch(`${process.env.REACT_APP_SERVER}/messages`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(fullMessage),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Message Sent Successfully");
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-96 py-10 my-5 bg-slate-100 rounded-lg">
      <form onSubmit={handleSubmit} className="w-full px-4 md:w-1/2 lg:w-3/4">
        <div className="w-full flex flex-col">
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">What is your name?</span>
            </label>
            <input
              type="text"
              name="name"
              readOnly
              required
              defaultValue={user?.displayName}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Your Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              required
              readOnly
              defaultValue={user?.email}
              placeholder="Type here"
              className="input input-bordered w-full "
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Type Your Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Type form Here...."
              name="message"
            ></textarea>
          </div>
          <input
            type="submit"
            className={`${
              !user?.email && "btn-disabled"
            } btn btn-wide mt-5 btn-success`}
            value="Sent"
          />
        </div>
      </form>
    </div>
  );
};

export default Message;
