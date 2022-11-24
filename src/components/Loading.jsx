import { Dna } from "react-loader-spinner";
import React from "react";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Dna
        visible={true}
        height="180"
        width="180"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loading;
