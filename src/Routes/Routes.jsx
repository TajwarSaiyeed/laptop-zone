import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../Layout/AdminLayout";
import Main from "../Layout/Main";
import SellerLayout from "../Layout/SellerLayout";
import Admin from "../pages/Admin/Admin";
import AdminAllBuyers from "../pages/Admin/AdminAllBuyers";
import AdminAllSellers from "../pages/Admin/AdminAllSellers";
import AdminReportedItems from "../pages/Admin/AdminReportedItems";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/Signup";
import Blogs from "../pages/Blogs/Blogs";
import Dashboard from "../pages/Dashboard/Dashboard";
import DisplayError from "../pages/DisplayError/DisplayError";
import Home from "../pages/Home/Home";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Products from "../pages/Products/Products";
import Profile from "../pages/Profile/Profile";
import Seller from "../pages/Seller/Seller";
import SellerAddAProduct from "../pages/Seller/SellerAddAProduct";
import SellerProducts from "../pages/Seller/SellerProducts";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from "./SellerRoute";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <DisplayError />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      {
        path: "/category/:id",
        element: <Products />,
        loader: ({ params }) =>
          fetch(`${process.env.REACT_APP_SERVER}/category/${params.id}`),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/user/admin",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    errorElement: <DisplayError />,
    children: [
      {
        path: "/user/admin",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
      },
      {
        path: "/user/admin/allsellers",
        element: (
          <AdminRoute>
            <AdminAllSellers />
          </AdminRoute>
        ),
      },
      {
        path: "/user/admin/allbuyers",
        element: (
          <AdminRoute>
            <AdminAllBuyers />
          </AdminRoute>
        ),
      },
      {
        path: "/user/admin/report",
        element: (
          <AdminRoute>
            <AdminReportedItems />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "/user/seller",
    element: (
      <PrivateRoute>
        <SellerLayout />
      </PrivateRoute>
    ),
    errorElement: <DisplayError />,
    children: [
      {
        path: "/user/seller",
        element: (
          <SellerRoute>
            <Seller />
          </SellerRoute>
        ),
      },
      {
        path: "/user/seller/addaproduct",
        element: (
          <SellerRoute>
            <SellerAddAProduct />
          </SellerRoute>
        ),
      },
      {
        path: "/user/seller/myproducts",
        element: (
          <SellerRoute>
            <SellerProducts />
          </SellerRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
