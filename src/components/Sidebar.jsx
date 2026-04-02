import { ImSearch } from "react-icons/im";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

import OtherUsers from "./OtherUsers";

export default function Sidebar() {

  const navigate = useNavigate();
  const logoutHandler = async ()=>{
    try {
      const response = await axios.get(
        "https://chat-go-app-backend.vercel.app/api/v1/user/logout",
      );
      navigate("/login")
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className="border-r border-slate-700 p-4 flex flex-col h-137.5">
      {/* 🔍 Search */}
      <form className="flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered rounded-md w-full"
          placeholder="search.."
        />

        <button type="submit" className="btn">
          <ImSearch />
        </button>
      </form>

      <div className="divider"></div>

      <OtherUsers />
      <div className="mt-4 flex items-center gap-2 cursor-pointer hover:text-red-500">
        <BiLogOutCircle className="text-xl" />
        <span onClick={logoutHandler} >Log Out</span>
      </div>
    </div>
  );
}
