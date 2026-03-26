import OtherSingleUser from "./OtherSingleUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";

export default function OtherUsers() {
  
  useGetOtherUsers();

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
      <OtherSingleUser />
      <OtherSingleUser />
      <OtherSingleUser />
      <OtherSingleUser />
    </div>
  );
}
