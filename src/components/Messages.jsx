import Message from "../components/Message"

function Messages() {
  return (
    <div className="p-4 flex-1 overflow-auto">
        <Message />
        <Message />
        <Message />
    </div>
  )
}

export default Messages