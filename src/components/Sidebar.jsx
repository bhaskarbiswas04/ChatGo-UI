import { ImSearch } from "react-icons/im";
import OtherUsers from "./OtherUsers";

export default function Sidebar() {
  return (
    <div className="border-r border-slate-700 p-4 flex flex-col">
      <form action="" className="flex items-center gap-2">
        <input
          type="text"
          className="input input-bordered rounded-md"
          placeholder="search.."
        />

        <button type="submit" className="btn">
          <ImSearch className="outline-none" />
        </button>
      </form>
      <div className="divider"></div>
      <OtherUsers />
    </div>
  );
}
