import { FiSend } from "react-icons/fi";

function SendInput() {
  return (
    <form className="py-4 mx-3">
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type your Message..."
          className="border p-3 text-sm rounded-lg block w-full text-white"
        />
        <button className="absolute inset-y-0 inset-e-0 flex items-center">
          <FiSend className="mr-4 size-5 cursor-pointer" />
        </button>
      </div>
    </form>
  );
}

export default SendInput;
