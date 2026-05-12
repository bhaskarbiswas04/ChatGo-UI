import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"; // Added hooks
import { setLoading } from "../redux/loadingSlice"; // Import action

export default function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access loading state to disable UI elements
  const { isLoading } = useSelector((store) => store.loading);

  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Client-side validation check
    if (user.password !== user.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    dispatch(setLoading(true)); // START LOADING

    try {
      const res = await axios.post(
        "https://chatgo-app-backend-1.onrender.com/api/v1/user/register",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      dispatch(setLoading(false)); // STOP LOADING
      setUser({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
    }
  };

  return (
    <div className="min-w-100 mx-auto">
      <div className="p-4 w-full bg-gray-0 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="py-4">
            <div className="m-2">
              <input
                value={user.fullName}
                onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Full Name"
                disabled={isLoading}
                required
              />
            </div>

            <div className="m-2">
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Username"
                disabled={isLoading}
                required
              />
            </div>

            <div className="m-2">
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Password"
                disabled={isLoading}
                required
              />
            </div>

            <div className="m-2">
              <input
                value={user.confirmPassword}
                onChange={(e) =>
                  setUser({ ...user, confirmPassword: e.target.value })
                }
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Confirm Password"
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex w-full ms-2 justify-start gap-4">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={() => handleCheckbox("male")}
                  className="checkbox"
                  disabled={isLoading}
                />
                <span className="label-text">Male</span>
              </label>
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  checked={user.gender === "female"}
                  onChange={() => handleCheckbox("female")}
                  className="checkbox"
                  disabled={isLoading}
                />
                <span className="label-text">Female</span>
              </label>
            </div>

            <p className="text-center p-3">
              Already have an account?
              <Link to="/login" className="ms-3 text-accent">
                Login
              </Link>
            </p>

            <div>
              <button
                type="submit"
                className="btn btn-block btn-accent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}