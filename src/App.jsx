import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import './App.css'
import io from "socket.io-client"
import { useEffect } from "react";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/userSlice";

import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

const router = createBrowserRouter([
  {path: "/", element: <HomePage />},
  {path: "/signup", element: <SignUp />},
  {path: "/login", element: <LogIn />},

])

function App() {

  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser) {
      const socket = io("https://chatgo-app-backend-1.onrender.com", {
        query: {
          userId: authUser._id,
        },
      });
      dispatch(setSocket(socket));

      socket.on("getOnlineUsers", (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      });

      return ()=> socket.close();  // this will call the disconnect function from be/socket.js
    } else {
      if(socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser])


  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App

