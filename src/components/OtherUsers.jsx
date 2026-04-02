import OtherSingleUser from "./OtherSingleUser";
import useGetOtherUsers from "../hooks/useGetOtherUsers";
import { useSelector } from "react-redux";

export default function OtherUsers() {
  
  useGetOtherUsers(); // custom hook
  const { otherUsers } = useSelector((store) => store.user);
  if (!otherUsers) return; //early return in react.

  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-2">
      {
        otherUsers?.map(user => {
          return (
            <OtherSingleUser key={user._id} user={user} />
          )
        })
      }
    </div>
  );
}
