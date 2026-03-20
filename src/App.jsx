import {createBrowserRouter, RouterProvider} from "react-router-dom";
import './App.css'

import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

const router = createBrowserRouter([
  {path: "/", element: <HomePage />},
  {path: "/signup", element: <SignUp />},
  {path: "/login", element: <LogIn />},

])

function App() {

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App

