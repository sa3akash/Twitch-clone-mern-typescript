import { useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../store/auth";
import {Outlet, useNavigate} from 'react-router-dom'

const Dashboard = () => {
  const user = useAuth((state) => state.user);

  console.log(user);

  const navigate = useNavigate()

  useEffect(()=>{
    if(!user){
      navigate("/auth")
    }
  },[navigate, user])

  return (
    <div className="w-screen h-screen bg-black/90 text-white overflow-x-hidden">
      <Navbar />
      <div className="flex gap-4 w-full h-full overflow-hidden">
        <Sidebar />
        <div className="mt-16 flex-1 overflow-y-auto">
        <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
