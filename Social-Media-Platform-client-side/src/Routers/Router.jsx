import {
     createBrowserRouter,
} from "react-router-dom";
import Main from "../Laout/Main";
import ErrorPage from "../shared/ErrorPage";

export const router = createBrowserRouter([
     {
          path: "/",
          element: <Main></Main>,
          errorElement: <ErrorPage></ErrorPage>,
          children: [
               // {
               //      path: "/",
               //      element: <Home></Home>
               // },
          ]
     },
    
]);