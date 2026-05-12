import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import io from "socket.io-client";
import { useEffect } from "react";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  // 1. Define the router inside the component to access authUser
  const router = createBrowserRouter([
    {
      path: "/",
      element: authUser ? <HomePage /> : <Navigate to="/login" />,
    },
    {
      path: "/signup",
      element: authUser ? <Navigate to="/" /> : <SignUp />,
    },
    {
      path: "/login",
      element: authUser ? <Navigate to="/" /> : <LogIn />,
    },
  ]);

  useEffect(() => {
    if (authUser) {
      const socket = io("https://chatgo-app-backend-1.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;