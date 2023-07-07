import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Laout/Main";
import Home from "../components/Home/Home";
import OurMenu from "../components/OurMenu/OurMenu";
import Orders from "../components/Orders/Orders";
import Login from "../components/Login/Login";
import SingUp from "../components/SingUp/SingUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Secret from "../shared/Secret/Secret";
import Dashboard from "../Laout/Dashboard";
import MyCard from "../components/Dashboard/MyCard/MyCard";
import AllUsers from "../components/AllUsers/AllUsers";
import AddItem from "../components/Dashboard/AddItem/AddItem";
import AdminRoute from "../PrivateRoute/AdminRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
      {
        path: "ourMenu",
        element: <OurMenu></OurMenu>
      },
      {
        path: 'order/:category',
        element: <Orders></Orders>
      },
      {
        path: 'order',
        element: <Orders></Orders>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signUp',
        element: <SingUp></SingUp>
      },
      {
        path: 'secret',
        element: <PrivateRoute><Secret></Secret></PrivateRoute>
      },
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'myCard',
        element: <MyCard></MyCard>
      },
      {
        path: 'users',
        element: <AllUsers></AllUsers>
      },
      {
        path: 'addItem',
        element: <AdminRoute><AddItem></AddItem></AdminRoute>
      },

    ]
  },
]);