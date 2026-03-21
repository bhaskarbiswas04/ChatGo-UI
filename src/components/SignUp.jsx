import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default function SignUp() {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const handleCheckbox = (gender)=>{
    setUser({...user, gender})
  }

  const onSubmitHandler = (e)=>{
    e.preventDefault();
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    });    
  }

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
              />
            </div>

            <div className="m-2">
              <input
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Username"
              />
            </div>

            <div className="m-2">
              <input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Password"
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
              />
            </div>

            <div className="flex w-full ms-2 justify-start gap-4">
              <div>
                <input
                  type="checkbox"
                  checked={user.gender === "male"}
                  onChange={() => {
                    handleCheckbox("male");
                  }}
                  className="checkbox"
                />{" "}
                Male
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={user.gender === "female"}
                  onChange={() => {
                    handleCheckbox("female");
                  }}
                  className="checkbox"
                /> {" "}
                Female
              </div>
            </div>

            <p className="text-center p-3">
              Already have an account?
              <Link to="/login" className="ms-3 text-accent">
                Login
              </Link>
            </p>

            <div>
              <button type="submit" className="btn btn-block btn-accent ">
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
