import { BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast"
import OtherUsers from "./OtherUsers";
import useGetOtherUsers from "../hooks/useGetOtherUsers";


export default function Sidebar() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useGetOtherUsers();
  const { otherUsers } = useSelector(store=>store.user);

  const filteredUsers =
    otherUsers?.filter((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  const logoutHandler = async ()=>{
    try {
      const response = await axios.get(
        "https://chat-go-app-backend.vercel.app/api/v1/user/logout",
      );
      localStorage.removeItem("token");
      dispatch(setAuthUser(null)); // Removed auth-user from redux
      navigate("/login"); // navigated to login page
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  const searchSubmitHandler = (e)=>{
    e.preventDefault();
    if (filteredUsers.length === 0) {
      toast.error("User Not Found!");
    }
  }

  return (
    <div className="border-r border-slate-700 p-4 flex flex-col h-137.5 ">
      {/* Search */}
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="input input-bordered rounded-md w-full"
          placeholder="search.."
        />
      </form>

      <div className="divider"></div>

      {filteredUsers.length > 0 ? (
        <OtherUsers users={filteredUsers} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 italic">
          {search.length > 0 ? "No user found" : "Loading users..."}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 cursor-pointer hover:text-red-500">
        <BiLogOutCircle className="text-xl" />
        <span onClick={logoutHandler}>Log Out</span>
      </div>
    </div>
  );
}
