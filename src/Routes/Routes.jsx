import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import DisplayError from "../pages/DisplayError/DisplayError";
import Home from "../pages/Home/Home";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <DisplayError />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
    ],
  },

  {
    path: "*",
    element: <div>404</div>,
  },
]);
