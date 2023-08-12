import {
  createBrowserRouter,
} from "react-router-dom";
import Main from "../Laout/Main";
import Home from "../components/Home/Home";
import Orders from "../components/Orders/Orders";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ErrorPage from "../shared/ErrorPage";
import Profile from "../Laout/Profile";
import AuthProvider from "../AuthProvider/AuthProvider";
import PrivateRoute from "./PrivateRoute";
import Post from "../profilePages/Post/Post";
import MyPost from "../profilePages/MyPost/MyPost";
import Comments from "../components/Comments/Comments";
import Friends from "../components/Friends/Friends";
import RequestConfirm from "../components/RequestConfirm/RequestConfirm";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element:<PrivateRoute><Home></Home></PrivateRoute> 
      },
      {
        path: "friends",
        element: <PrivateRoute><Friends></Friends></PrivateRoute>
      },
      {
        path: "/profile/friends",
        element: <PrivateRoute><Friends></Friends></PrivateRoute>
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
    element: <PrivateRoute><Profile></Profile></PrivateRoute>,
    children: [
      {
        path: 'requestConfirm',
        element: <RequestConfirm></RequestConfirm>
      },
      {
        path: 'post',
        element: <Post></Post>
      },
      {
        path: 'myPost', 
        element: <MyPost></MyPost>
      },
    ]
  }
]);