import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthProvider";
import useSeller from "../hooks/useSeller";

const SellerRoute = ({ children }) => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <Loading />;
  }
  if (isSeller) {
    return children;
  } else {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default SellerRoute;
