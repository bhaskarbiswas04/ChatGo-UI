import OtherSingleUser from "./OtherSingleUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

export default function OtherUsers({users}) {
  useGetOtherUsers(); // custom hook

  const { otherUsers } = useSelector((store) => store.user);

  const displayUsers = users || otherUsers;

  if (!displayUsers) return; //early return if no data exists yet.

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
      {displayUsers?.map((user) => {
        return <OtherSingleUser key={user._id} user={user} />;
      })}
    </div>
  );
}
