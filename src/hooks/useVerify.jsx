import { useEffect } from "react";
import { useState } from "react";

const useSeller = (email) => {
  const [isVerified, setIsVerified] = useState("");
  const [isVerifiedLoading, setIsVerifiedLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_SERVER}/sellerVerify/${email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIsVerified(data.isVerified);
          setIsVerifiedLoading(false);
        });
    }
  }, [email]);
  return [isVerified, isVerifiedLoading];
};

export default useSeller;
