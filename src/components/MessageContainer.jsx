import Messages from "./Messages";
import SendInput from "./SendInput";

export default function MessageContainer () {
    return (
        <div className="md:min-w-137.5 flex flex-col">
          <div className="group flex items-center gap-2 bg-gray-800 p-3">
            <div className="avatar avatar-online">
              <div className="w-12 rounded-full">
                <img
                  src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
                  alt="user-profile"
                />
              </div>
            </div>

            <div>
              <p className="text-white">Bhaskar Biswas</p>
            </div>
          </div>
            <Messages />
            <SendInput />
        </div>
    );
}