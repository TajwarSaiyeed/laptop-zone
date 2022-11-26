import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import { AuthContext } from "../contexts/AuthProvider";
import useBuyer from "../hooks/useBuyer";

const UserRoute = ({ children }) => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <Loading />;
  }
  if (isBuyer) {
    return children;
  } else {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
};

export default UserRoute;
