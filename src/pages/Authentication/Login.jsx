import React, { useContext, useState } from "react";
import logo from "../../assets/fav.png";
import { Link } from "react-router-dom";
import { FcGoogle, FcInfo } from "react-icons/fc";
import { AuthContext } from "../../contexts/AuthProvider";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const [err, setErr] = useState("");
  const { login, googleLogin, user, loading } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const handleLogin = (data) => {
    const { email, password } = data;

    login(email, password)
      .then(() => {
        setErr(null);
        toast.success("Login SuccessFul");
      })
      .catch((err) => {
        const error = err.message.split("/")[1].split(").")[0];
        setErr(error);
      });
  };

  return (
    <div className="w-full flex justify-between">
      <div className="hidden bg-yellow-200 lg:block lg:w-1/2 md:w-1/2">
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
          <h1 className="text-3xl">Sign in</h1>
          <form className="w-full" onSubmit={handleSubmit(handleLogin)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Email</span>
              </label>
              <input
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
                <span className="label-text font-bold">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Passoword is Required",
                  minLength: {
                    value: 6,
                    message: "Password Must be 6 Characters or long",
                  },
                })}
                type="password"
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
          <div>{err && <p className="uppercase text-error">{err}</p>}</div>
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
    </div>
  );
};

export default Login;
