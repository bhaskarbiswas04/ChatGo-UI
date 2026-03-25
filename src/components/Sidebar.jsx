import { ImSearch } from "react-icons/im";
import { BiLogOutCircle } from "react-icons/bi";

import OtherUsers from "./OtherUsers";

export default function Sidebar() {
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
        <span>Log Out</span>
      </div>
    </div>
  );
}
