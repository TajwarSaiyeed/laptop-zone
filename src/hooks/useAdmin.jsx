import { useEffect } from "react";
import { useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState("");
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    console.log(email);
    if (email) {
      fetch(`${process.env.REACT_APP_SERVER}/users/admin/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setIsAdmin(data.isAdmin);
          setIsAdminLoading(false);
        });
    }
  }, [email]);
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
