import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import Main from "../Layout/Main";
import Admin from "../pages/Admin/Admin";
import AdminAllBuyers from "../pages/Admin/AdminAllBuyers";
import AdminAllSellers from "../pages/Admin/AdminAllSellers";
import AdminReportedItems from "../pages/Admin/AdminReportedItems";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import Blogs from "../pages/Blogs/Blogs";
import DisplayError from "../pages/DisplayError/DisplayError";
import Home from "../pages/Home/Home";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <DisplayError />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/user/admin",
    element: <AdminLayout />,
    errorElement: <DisplayError />,
    children: [
      { path: "/user/admin", element: <Admin /> },
      { path: "/user/admin/allSellers", element: <AdminAllSellers /> },
      { path: "/user/admin/allBuyers", element: <AdminAllBuyers /> },
      { path: "/user/admin/report", element: <AdminReportedItems /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
