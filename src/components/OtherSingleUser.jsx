import { setSelectedUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";


function OtherSingleUser({user}) {
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user);

  const selectedUserHandler = (user)=>{
    dispatch(setSelectedUser(user));
  }
 
  return (
    <>
      <div
        onClick={() => selectedUserHandler(user)}
        className={` ${selectedUser?._id === user?._id ? "bg-blue-300 text-black" : ""} group flex items-center gap-2 hover:bg-blue-300 rounded-md p-2 cursor-pointer transition-all duration-300`}
      >
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img src={user?.profilePhoto} alt="user-profile" />
          </div>
        </div>

        <div>
          <p className="group-hover:text-black">{user?.fullName}</p>
        </div>
      </div>
      <div className="divider h-1 py-0 my-0"></div>
    </>
  );
}

export default OtherSingleUser