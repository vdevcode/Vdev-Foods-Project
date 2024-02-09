import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import SignUp from "../components/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPay from "../pages/shop/CartPay";
import DashBoardLayout from "../layout/DashBoardLayout";
import DashBoard from "../pages/administrator/admin/DashBoard";
import Users from "../pages/administrator/admin/Users";
import Login from "../components/Login";
import AddMenu from "../pages/administrator/admin/AddMenu";
import ManagerItems from "../pages/administrator/admin/ManagerItems";
import UpdateMenu from "../pages/administrator/admin/UpdateMenu";
import ProcessCheckout from "../pages/shop/ProcessCheckout";
import Order from "../pages/dashboard/Order";
import ManagerBooking from "../pages/administrator/admin/ManagerBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: (
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />,
      },
      {
        path: "/cart-pay",
        element: <CartPay />,
      },
      //payment
      {
        path: "process-checkout",
        element: <ProcessCheckout />,
      },
      //order
      {
        path: "/order",
        element: <Order/>
      }
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  //admin
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "",
        element: <DashBoard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "add-menu",
        element: <AddMenu />,
      },
      {
        path: "manager-booking",
        element: <ManagerBooking />,
      },
      {
        path: "manage-items",
        element: <ManagerItems />,
      },
      {
        path: "update-menu/:id",
        element: <UpdateMenu />,
        loader: ({ params }) =>
          fetch(`http://localhost:6001/menu/${params.id}`),
      },
    ],
  },
]);

export default router;
