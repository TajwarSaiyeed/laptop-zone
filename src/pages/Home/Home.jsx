import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import LaptopCategory from "./LaptopCategory";
import LaptopSlider from "./LaptopSlider";

const Home = () => {
  const [laptopCategories, setLaptopCategories] = useState([]);
  useEffect(() => {
    fetch("category.json")
      .then((res) => res.json())
      .then((data) => setLaptopCategories(data));
  }, []);
  return (
    <div className="w-full">
      {/* home banner */}
      <Banner />
      {/* home slider */}
      <LaptopSlider />

      {/* home categories */}
      <h1 className="font-bold text-5xl text-center">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-10 lg:gap-4 my-5">
        {laptopCategories?.map((laptopCategory) => (
          <LaptopCategory
            laptopCategory={laptopCategory}
            key={laptopCategory.id}
          />
        ))}
      </div>

      {/* home advertisement */}
    </div>
  );
};

export default Home;
