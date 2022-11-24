import React from "react";
import logo from "../../assets/fav.png";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen my-10">
      <div className="flex justify-center items-center gap-3 my-5">
        <div className="avatar">
          <div className="w-24 mask mask-hexagon">
            <img src={logo} alt="" />
          </div>
        </div>
        <h1 className="text-4xl">Laptop Zone</h1>
      </div>
      <div className="lg:w-2/5 md:w-3/5 sm:w-4/5 w-full lg:px-10 md:px-8 sm:px-6 px-5 justify-center items-center flex-col flex min-h-96 py-10 border rounded-2xl">
        <h1 className="text-3xl">Sign in</h1>
        <form className="w-full">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Email</span>
            </label>
            <input className="input input-bordered" placeholder="" />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <input
              type="password"
              placeholder=""
              className="input input-bordered w-full"
            />

            <label className="label">
              <span className="label-text-alt font-semibold">
                Forget Password?
              </span>
            </label>
          </div>
          <input
            type="submit"
            value="Login"
            className="btn btn-warning font-bold bg-yellow-300 w-full"
          />
        </form>
        <p className="my-2 text-sm">
          New to Laptop Zone?{" "}
          <Link className="link link-primary" to="/signup">
            Create your Laptop Zone account
          </Link>
        </p>

        <button className="btn my-3 gap-3">
          <FcGoogle className="w-4 h-4" />
          continue with google
        </button>
      </div>
    </div>
  );
};

export default Login;
