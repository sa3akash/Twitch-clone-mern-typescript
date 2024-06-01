import { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";
import { socketService } from "../socket";

const Dashboard = () => {

  useEffect(() => {
    socketService.start();
    
  }, []);

  return (
    <div className="w-screen h-screen bg-black/90 text-white overflow-x-hidden">
      <Navbar />
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <Sidebar />
        <div className="mt-16 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
