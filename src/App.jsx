import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import './App.css'


import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

// const router = createBrowserRouter([
//   {path: "/", element: <HomePage />},
//   {path: "/signup", element: <SignUp />},
//   {path: "/login", element: <LogIn />},

// ])

function App() {
  // 1. Grab the authUser from your Redux store
  const { authUser } = useSelector((store) => store.user);

  // 2. Define the router INSIDE the component so it has access to authUser
  const router = createBrowserRouter([
    {
      path: "/",
      // If logged in, show Home. If not, show Login.
      element: authUser ? <HomePage /> : <LogIn />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
  ]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App

