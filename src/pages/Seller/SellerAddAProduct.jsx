import React, { useContext, useEffect, useState } from "react";
import SmallLoading from "../../components/SmallLoading";
import { useForm } from "react-hook-form";
import { FcInfo } from "react-icons/fc";
import axios from "axios";
import toast from "react-hot-toast";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import useVerify from "../../hooks/useVerify";
const SellerAddAProduct = () => {
  const [laptopCategories, setLaptopCategories] = useState([]);
  const [loogin, setLoogin] = useState(false);
  const { user } = useContext(AuthContext);
  const [isVerified] = useVerify(user?.email);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER}/category`).then((data) => {
      setLaptopCategories(data.data);
    });
  }, []);

  const handleAddProduct = (data) => {
    setLoogin(true);
    const dateObj = new Date();
    const month = dateObj.getUTCMonth() + 1; //months from 1-12
    const day = dateObj.getUTCDate();
    const year = dateObj.getUTCFullYear();

    const uploadDate = year + "/" + month + "/" + day;

    const {
      category,
      condition,
      description,
      image,
      location,
      mobile,
      name,
      originalPrice,
      price,
      yearUse,
    } = data;

    const formData = new FormData();
    formData.append("image", image[0]);

    const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_KEY}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const cName = category.split("-")[0];
        const cId = category.split("-")[1];

        const product = {
          productName: name,
          productImage: imgData.data.display_url,
          price,
          originalPrice,
          yearOfUse: yearUse,
          productCondition: condition,
          location,
          mobile,
          details: description,
        };
        // axios for posting product
        axios
          .post(
            `${process.env.REACT_APP_SERVER}/products`,
            {
              product,
              sellerName: user?.displayName,
              sellerImage: user?.photoURL,
              sellerEmail: user?.email,
              categoryId: cId,
              categoryName: cName,
              uploadDate,
              isVerified,
            },
            {
              headers: {
                authorization: `bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          )
          .then((res) => {
            if (res.data.acknowledged) {
              toast.success("Product Added");
              navigate("/user/seller/myproducts");
              setLoogin(false);
              reset();
            }
          })
          .catch((err) => console.log(err));
      });
  };

  return (
    <div className="flex justify-center items-center flex-col w-1/2 mx-auto">
      <h1 className="text-xl lg:text-5xl md:text-3xl">Add A Product</h1>
      <form className="w-full my-5" onSubmit={handleSubmit(handleAddProduct)}>
        {/* product name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Required" })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.name && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.name?.message}
              </span>
            </label>
          )}
        </div>
        {/* product image */}
        <div className="form-control w-full ">
          <label className="label">
            <span className="label-text">Select Your Image</span>
          </label>
          <input
            required
            type="file"
            name="image"
            accept="image/*"
            {...register("image")}
            className="file-input file-input-bordered w-full "
          />
        </div>
        {/* product price */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Product Price</span>
          </label>
          <input
            type="number"
            {...register("price", { required: "Required" })}
            min={0}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.price && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.price?.message}
              </span>
            </label>
          )}
        </div>
        {/* product excellent good fair */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Pick Your Product Condition</span>
          </label>
          <select
            {...register("condition", {
              required: "Product Condition Required",
            })}
            className="select select-bordered"
          >
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
          </select>
          {errors.condition && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.condition?.message}
              </span>
            </label>
          )}
        </div>
        {/* seller mobile number */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Seller Mobile Number</span>
          </label>
          <input
            type="number"
            {...register("mobile", { required: "Mobile Number Required" })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.mobile && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.mobile?.message}
              </span>
            </label>
          )}
        </div>
        {/* product/seller locaion */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Product Location</span>
          </label>
          <input
            type="text"
            {...register("location", { required: "Location Must Required" })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.location && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.location?.message}
              </span>
            </label>
          )}
        </div>
        {/* product category select */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Pick Your Product Category</span>
          </label>
          <select
            {...register("category", { required: "Caregory Required" })}
            className="select select-bordered"
          >
            <option disabled>Please Select A Specialty</option>
            {laptopCategories?.map((laptopCategory) => (
              <option
                key={laptopCategory._id}
                value={`${laptopCategory.categoryName}-${laptopCategory._id}`}
              >
                {laptopCategory.categoryName}
              </option>
            ))}
          </select>
          {errors.category && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.category?.message}
              </span>
            </label>
          )}
        </div>
        {/* product description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Product Description</span>
          </label>
          <textarea
            {...register("description", { required: "Required" })}
            className="textarea textarea-bordered h-24"
            placeholder="Your Description ......"
          ></textarea>
          {errors.description && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.description?.message}
              </span>
            </label>
          )}
        </div>
        {/* product price original */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Original Price</span>
          </label>
          <input
            type="number"
            {...register("originalPrice", {
              required: "Original Price Required",
            })}
            min={0}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.originalPrice && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.originalPrice?.message}
              </span>
            </label>
          )}
        </div>
        {/* year of purchase */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Year Of Purchase</span>
          </label>
          <input
            type="number"
            {...register("yearUse", { required: "Required" })}
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          {errors.yearUse && (
            <label className="label">
              <span className="label-text flex justify-center items-center gap-1">
                <FcInfo /> {errors.yearUse?.message}
              </span>
            </label>
          )}
        </div>

        {/* submit */}
        <div>
          <button
            type="submit"
            className="btn border-none mt-5 hover:bg-pink-400 bg-pink-300 w-full"
          >
            {loogin ? <SmallLoading /> : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerAddAProduct;
