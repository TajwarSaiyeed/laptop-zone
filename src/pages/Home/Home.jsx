import React, { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { AuthContext } from "../../contexts/AuthProvider";
import Banner from "./Banner";
import LaptopCategory from "./LaptopCategory";
import LaptopSlider from "./LaptopSlider";
import axios from "axios";
import Advertisement from "./Advertisement";
import { useQuery } from "@tanstack/react-query";
import AdvertiseAddToCard from "./AdvertiseAddToCard";
import toast from "react-hot-toast";
import Message from "./Message";

const Home = () => {
  const [laptopCategories, setLaptopCategories] = useState([]);
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER}/category`)
      .then((data) => setLaptopCategories(data.data));
  }, []);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_SERVER}/advertiseProduct/`,
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
  const handleReport = (id) => {
    fetch(`${process.env.REACT_APP_SERVER}/products?id=${id}`, {
      method: "PUT",
      headers: {
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Product Reported");
          refetch();
        }
      });
  };

  const [selectProduct, setSelectProduct] = useState(null);
  if (selectProduct) {
    refetch();
  }
  if (isLoading) <Loading />;

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="w-full">
      {/* home banner */}
      <Banner />
      {/* home slider */}
      <LaptopSlider />

      {/* home categories */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl uppercase">Categories</h1>
        <button className="btn btn-success btn-outline">see all</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 lg:gap-4 my-5">
        {laptopCategories?.map((laptopCategory) => (
          <LaptopCategory
            laptopCategory={laptopCategory}
            key={laptopCategory._id}
          />
        ))}
      </div>

      {/* home advertisement */}
      <div className="my-5">
        {products.length > 0 && (
          <div>
            <div className="flex justify-between items-center my-5">
              <h1 className="text-2xl font-bold uppercase">Advertise</h1>
              <button className="btn btn-success">See All</button>
            </div>
            <div className="carousel carousel-center max-w-full h-96 p-4 space-x-4 bg-slate-300 rounded-box">
              {products.map((product) => {
                return (
                  <Advertisement
                    key={product._id}
                    product={product}
                    setSelectProduct={setSelectProduct}
                    handleReport={handleReport}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      {selectProduct && (
        <AdvertiseAddToCard
          refetch={refetch}
          setSelectProduct={setSelectProduct}
          selectProduct={selectProduct}
        />
      )}
      <div>
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-success text-2xl uppercase mb-2">
            Give Your Review
          </h1>
        </div>
        <Message />
      </div>
    </div>
  );
};

export default Home;
