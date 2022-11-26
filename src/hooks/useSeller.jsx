import { useEffect } from "react";
import { useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState("");
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_SERVER}/users/seller/${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsSeller(data.isSeller);
          setIsSellerLoading(false);
        });
    }
  }, [email]);
  return [isSeller, isSellerLoading];
};

export default useSeller;
