import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { setAuthUser } from "../redux/userSlice";
import { setLoading } from "../redux/loadingSlice";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // You can also use this to disable the button while loading
  const { isLoading } = useSelector((store) => store.loading);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true)); // START LOADING

    try {
      const response = await axios.post(
        "https://chatgo-app-backend-1.onrender.com/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        dispatch(setAuthUser(response.data));
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      dispatch(setLoading(false)); // STOP LOADING
      setUser({
        username: "",
        password: "",
      });
    }
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
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Username"
                required
                disabled={isLoading} // Disable input while loading
              />
            </div>

            <div className="m-2">
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Password"
                required
                disabled={isLoading} // Disable input while loading
              />
            </div>

            <p className="text-center p-3">
              Do not have an account?
              <Link to="/signup" className="ms-3 text-accent">
                Sign Up
              </Link>
            </p>

            <div>
              <button
                type="submit"
                className="btn btn-block btn-accent"
                disabled={isLoading} // Prevent double submission
              >
                {isLoading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}