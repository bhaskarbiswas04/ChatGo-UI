import { useSelector } from "react-redux";
import Messages from "./Messages";
import SendInput from "./SendInput";

export default function MessageContainer () {

  const { selectedUser } = useSelector(store=>store.user);

    return (
        <div className="md:min-w-137.5 flex flex-col">
          <div className="group flex items-center gap-2 bg-gray-800 p-3">
            <div className="avatar avatar-online">
              <div className="w-12 rounded-full">
                <img
                  src={selectedUser?.profilePhoto}
                  alt="user-profile"
                />
              </div>
            </div>

            <div>
              <p className="text-white">{selectedUser?.fullName}</p>
            </div>
          </div>
            <Messages />
            <SendInput />
        </div>
    );
}