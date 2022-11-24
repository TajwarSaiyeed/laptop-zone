import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/fav.png";
import { FcGoogle, FcInfo } from "react-icons/fc";
import { useForm } from "react-hook-form";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleCreateUser = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full flex justify-between">
      <div className="hidden bg-pink-200 lg:block lg:w-1/2 md:w-1/2">
        <div className="flex flex-col justify-center items-center gap-3 my-5">
          <div className="avatar">
            <div className="w-32 mask mask-hexagon">
              <img src={logo} alt="" />
            </div>
          </div>
          <h1 className="text-4xl">Laptop Zone</h1>
          <p className="">On the best resale platform in the world.</p>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center min-h-screen my-10">
        <div className="w-3/4 lg:px-10 md:px-8 sm:px-6 px-5 justify-center items-center flex-col flex min-h-96 py-10 border rounded-2xl">
          <h1 className="text-3xl">Create account</h1>
          <form className="w-full" onSubmit={handleSubmit(handleCreateUser)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Required" })}
                className="input input-bordered"
                placeholder=""
              />
              {errors.name && (
                <label className="label">
                  <span className="label-text flex justify-center items-center gap-1">
                    <FcInfo /> {errors.name?.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Required" })}
                className="input input-bordered"
                placeholder=""
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text flex justify-center items-center gap-1">
                    <FcInfo /> {errors.email?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text  font-bold">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Passoword is Required",
                  minLength: {
                    value: 6,
                    message: "Password Must be 6 Characters or long",
                  },
                })}
                placeholder=""
                className="input input-bordered w-full"
              />

              {errors.password && (
                <label className="label">
                  <span className="label-text flex justify-center items-center gap-1">
                    <FcInfo /> {errors.password?.message}
                  </span>
                </label>
              )}
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Buyer</span>
                <input
                  {...register("role")}
                  type="radio"
                  value="buyer"
                  name="role"
                  className="radio checked:bg-red-500"
                  defaultChecked
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Seller</span>
                <input
                  {...register("role")}
                  type="radio"
                  value="seller"
                  name="role"
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
            <br />
            <input
              type="submit"
              value="continue"
              className="btn border-none hover:bg-pink-400 bg-pink-300 w-full"
            />
          </form>
          <p className="my-2 text-sm">
            Already in Laptop Zone?{" "}
            <Link className="link link-primary" to="/login">
              Login
            </Link>
          </p>

          <button className="btn my-3 gap-3">
            <FcGoogle className="w-4 h-4" />
            continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
