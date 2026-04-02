import Message from "../components/Message";
import useGetMessages from "../hooks/useGetMessages";

function Messages() {
  useGetMessages();
  return (
    <div className="p-4 flex-1 overflow-auto">
        <Message />
        <Message />
        <Message />
    </div>
  )
}

export default Messages