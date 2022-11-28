import React, { useContext } from "react";
import { useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const DisplayError = () => {
  const error = useRouteError();
  const { logOut } = useContext(AuthContext);
  const signout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };
  return (
    <div className="flex flex-col justify-center min-h-screen h-screen items-center w-2/4 mx-auto">
      <h1 className="text-3xl">Oops!</h1>
      <p className="text-error">Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <h4 className="text-xl">
        Please{" "}
        <button onClick={signout} className="btn btn-sm btn-error">
          Log Out
        </button>{" "}
        and Log back in.
      </h4>
    </div>
  );
};

export default DisplayError;
