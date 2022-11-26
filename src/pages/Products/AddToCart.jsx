import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import SmallLoading from "../../components/SmallLoading";

const AddToCart = ({ selectProduct }) => {
  const { productName, price, productImage } = selectProduct.product;
  console.log(selectProduct.product);
  const { user } = useContext(AuthContext);
  const [looding, setLooding] = useState(false);

  const handleBook = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const productName = form.productName.value;
    const price = form.price.value;
    const phone = form.phone.value;
    const meet = form.meet.value;

    const book = {
      name,
      email,
      productName,
      price,
      phone,
      meet,
      productImage,
    };
  };

  return (
    <>
      <input type="checkbox" id="addToCart" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="addToCart"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">{productName}</h3>
          <form onSubmit={handleBook}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Name</span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.displayName}
                disabled
                required
                className="input input-bordered"
                placeholder=""
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Eamil</span>
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled
                required
                className="input input-bordered"
                placeholder=""
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Product Name</span>
              </label>
              <input
                type="text"
                name="productName"
                defaultValue={productName}
                disabled
                required
                className="input input-bordered"
                placeholder=""
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Price</span>
              </label>
              <input
                type="number"
                name="price"
                defaultValue={price}
                disabled
                min={0}
                required
                className="input input-bordered"
                placeholder=""
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Phone</span>
              </label>
              <input
                type="number"
                min={0}
                name="phone"
                className="input input-bordered"
                placeholder=""
                required
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold">Meeting Location</span>
              </label>
              <input
                type="text"
                name="meet"
                className="input input-bordered"
                placeholder=""
                required
              />
            </div>
            <div className="my-3">
              <button
                type="submit"
                className="btn border-none hover:bg-pink-400 bg-pink-300 w-full"
              >
                {looding ? <SmallLoading /> : "Book Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
