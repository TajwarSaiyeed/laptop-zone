import { ThreeCircles } from "react-loader-spinner";
import React from "react";

const SmallLoading = () => {
  return (
    <ThreeCircles
      height="20"
      width="20"
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
};

export default SmallLoading;
