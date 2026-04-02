import React from 'react'

function OtherSingleUser(props) {
  const user = props.user;
  return (
    <div>
      <div className="group flex items-center gap-2 hover:bg-blue-300 rounded-md p-2 cursor-pointer transition-all duration-300">
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img
              src={user?.profilePhoto}
              alt="user-profile"
            />
          </div>
        </div>

        <div>
          <p className="group-hover:text-black">{user?.fullName}</p>
        </div>
      </div>
      <div className="divider h-1 py-0 my-0"></div>
    </div>
  );
}

export default OtherSingleUser