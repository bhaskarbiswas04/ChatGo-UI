import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://chat-go-app-backend.vercel.app/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      navigate("/");
      console.log(response.data);
      dispatch(setAuthUser(response.data))
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    // setUser({
    //   username: "",
    //   password: "",
    // });
  };

  return (
    <div className="min-w-100 mx-auto">
      <div className="p-4 w-full bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Log In</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="py-4">
            <div className="m-2">
              <input
                value={user.username}
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Username"
              />
            </div>

            <div className="m-2">
              <input
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Password"
              />
            </div>

            <p className="text-center p-3">
              Do not have an account?
              <Link to="/signup" className="ms-3 text-accent">
                Sign Up
              </Link>
            </p>

            <div>
              <button type="submit" className="btn btn-block btn-accent ">
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
