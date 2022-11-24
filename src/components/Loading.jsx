import { ThreeCircles } from "react-loader-spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </div>
  );
};

export default Loading;
