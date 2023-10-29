import { createBrowserRouter } from "react-router-dom";

import Main from "../src/LayOut/Main";
import Home from "../src/Page/Home/Home/Home";
import Login from "../src/Page/Login/Login";
import SignUp from "../src/Page/SignUp/SignUp";
import CheckOut from "../src/Page/CheckOut/CheckOut";
import Booking from "../src/Page/Booking/Booking";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children : [
        {
            path: '/',
            element: <Home></Home>
            
        },
        {
          path: '/login',
          element: <Login/>
        },
        {
          path : '/signUp',
          element : <SignUp/>
        },
        {
          path : '/checkout/:id',
          element : <PrivateRoute><CheckOut></CheckOut></PrivateRoute>,
          loader : ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
          path : '/booking',
          element: <PrivateRoute><Booking></Booking></PrivateRoute>
        }
      ]
    },
  ]);
  export default router;