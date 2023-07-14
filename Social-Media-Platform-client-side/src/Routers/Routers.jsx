import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Laout/Main";
import Home from "../components/Home/Home";
import OurMenu from "../components/OurMenu/OurMenu";
import Orders from "../components/Orders/Orders";
import Login from "../components/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Secret from "../shared/Secret/Secret";
import Register from "../components/Register/Register";
import ErrorPage from "../shared/ErrorPage";
import Profile from "../Laout/Profile";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: 'order',
        element: <Orders></Orders>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'resister',
        element: <Register></Register>
      }
    ]
  },
  {
    path: "profile",
    element: <Profile></Profile>,
    children: [
      // {
      //   path: 'myCard',
      //   element: <MyCard></MyCard>
      // },
      // {
      //   path: 'users',
      //   element: <AllUsers></AllUsers>
      // },
      // {
      //   path: 'addItem',
      //   element: <AdminRoute><AddItem></AddItem></AdminRoute>
      // },

    ]
  },
]);