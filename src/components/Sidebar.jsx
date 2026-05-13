import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { setLoading } from "../redux/loadingSlice";
import axios from "axios";
import toast from "react-hot-toast"
import OtherUsers from "./OtherUsers";
import useGetOtherUsers from "../hooks/useGetOtherUsers";


export default function Sidebar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useGetOtherUsers();
  const { otherUsers, authUser } = useSelector((store) => store.user);
  const { isLoading } = useSelector((store) => store.loading);

  const filteredUsers =
    otherUsers?.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const logoutHandler = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axios.get(
        "https://chatgo-app-backend-1.onrender.com/api/v1/user/logout",
      );
      localStorage.removeItem("token");
      dispatch(setAuthUser(null)); // Removed auth-user from redux
      navigate("/login"); // navigated to login page
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (filteredUsers.length === 0) {
      toast.error("User Not Found!");
    }
  };

  // Sidebar.jsx
  return (
    <div className="border-r border-slate-700 flex flex-col w-[300px]">
      {" "}
      {/* Fixed width here too */}
      {/* LoggedIn User Section - Adjusted to align with Chat Header */}
      <div className="flex items-center gap-3 px-4 h-[64px] bg-slate-800/60 border-b border-slate-700">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src={authUser?.profilePhoto} alt="user" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-white text-sm leading-tight">
            {authUser?.fullName}
          </p>
          <p className="text-[10px] text-accent">@{authUser?.username}</p>
        </div>
      </div>
      {/* Search section - Add padding back here since we removed it from the parent */}
      <div className="p-4 flex flex-col flex-1 overflow-hidden">
        <form
          onSubmit={searchSubmitHandler}
          className="flex items-center gap-2 mb-4"
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="input input-bordered rounded-md w-full h-10 bg-gray-800/50"
            placeholder="Search friends..."
          />
        </form>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredUsers.length > 0 ? (
            <OtherUsers users={filteredUsers} />
          ) : (
            <div className="flex items-center justify-center text-gray-400 italic mt-10">
              No users found
            </div>
          )}
        </div>

        {/* Logout */}
        <div
          onClick={logoutHandler}
          className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2 cursor-pointer hover:text-red-500 transition-all"
        >
          <BiLogOutCircle className="text-xl" />
          <span className="font-medium text-sm">Log Out</span>
        </div>
      </div>
    </div>
  );
}
