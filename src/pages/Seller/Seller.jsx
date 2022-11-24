import React from "react";
import SellerStats from "./SellerStats";

const Seller = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center gap-4">
      <div className="w-full">
        <SellerStats />
      </div>
    </div>
  );
};

export default Seller;
