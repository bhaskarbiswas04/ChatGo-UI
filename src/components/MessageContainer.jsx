import { useSelector, useDispatch } from "react-redux";
import Messages from "./Messages";
import SendInput from "./SendInput";
import { useEffect } from "react";
import { setSelectedUser } from "../redux/userSlice";

export default function MessageContainer () {

  const { selectedUser, authUser } = useSelector(store=>store.user);
  const dispatch = useDispatch();

  useEffect(()=>{
    return () => dispatch(setSelectedUser(null));
  }, [])

    return (
      <>
        {selectedUser !== null ? (
          <div className="md:min-w-137.5 flex flex-col">
            <div className="group flex items-center gap-2 bg-gray-800 p-3">
              <div className="avatar avatar-online">
                <div className="w-12 rounded-full">
                  <img src={selectedUser?.profilePhoto} alt="user-profile" />
                </div>
              </div>

              <div>
                <p className="text-white">{selectedUser?.fullName}</p>
              </div>
            </div>
            <Messages />
            <SendInput />
          </div>
        ) : (
          <div className="md:min-w-137.5 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Hi, {authUser.fullName}</h1>
            <h1 className="text-xl">Let's select a friend.</h1>
          </div>
        )}
      </>
    );
}