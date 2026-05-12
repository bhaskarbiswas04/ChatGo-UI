import { useSelector, useDispatch } from "react-redux";
import Messages from "./Messages";
import SendInput from "./SendInput";
import { useEffect } from "react";
import { setSelectedUser } from "../redux/userSlice";

export default function MessageContainer () {

  const { selectedUser, authUser, onlineUsers, typingStatus } = useSelector(
    (store) => store.user,
  );
  // const { messages } = useSelector((store) => store.message);
  const isOnline = onlineUsers?.includes(selectedUser?._id); 
  const dispatch = useDispatch(); 

  useEffect(()=>{
    return () => dispatch(setSelectedUser(null));
  }, [])

    return (
      <>
        {selectedUser !== null ? (
          <div className="md:min-w-137.5 flex flex-col">
            <div className="group flex items-center gap-2 bg-gray-800 p-3">
              <div
                className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
              >
                <div className="w-12 rounded-full">
                  <img src={selectedUser?.profilePhoto} alt="user-profile" />
                </div>
              </div>

              <div>
                <p className="text-white">{selectedUser?.fullName}</p>
              </div>
            </div>
            {/* {messages !== "" ? <Messages /> : <p className="text-center p-4">No Previous Conversation yet!</p>} */}
            <Messages />

            {typingStatus && (
              <div className="text-shadow-md text-green-500 italic ml-2 text-center">
                {selectedUser?.fullName} is typing...
              </div>
            )}

            <SendInput />
          </div>
        ) : (
          <div className="md:min-w-137.5 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold">Hi, {authUser?.fullName}</h1>
            <p>Select a conversation from the sidebar to start chat !</p>
          </div>
        )}
      </>
    );
}