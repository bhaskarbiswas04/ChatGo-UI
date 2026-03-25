import React from 'react'

function OtherSingleUser() {
  return (
    <div>
      <div className="group flex items-center gap-2 hover:bg-blue-300 rounded-md p-2 cursor-pointer transition-all duration-300">
        <div className="avatar avatar-online">
          <div className="w-12 rounded-full">
            <img
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="user-profile"
            />
          </div>
        </div>

        <div>
          <p className="group-hover:text-black">Bhaskar Biswas</p>
        </div>
      </div>
      <div className="divider h-1 py-0 my-0"></div>
    </div>
  );
}

export default OtherSingleUser