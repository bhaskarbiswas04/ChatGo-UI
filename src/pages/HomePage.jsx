import MessageContainer from "../components/MessageContainer";
import Sidebar from "../components/Sidebar";

export default function HomePage() {
    return (
      <div className="flex sm:h-112.5 md:h-137.5 rounded-lg overflow-hidden bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    );
}