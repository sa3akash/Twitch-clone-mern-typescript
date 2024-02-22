import { useAuth } from "../store/auth";

const Dashboard = () => {
  const user = useAuth((state) => state.user);

  console.log(user);

  return (
    <div className="bg-gray-900 w-screen h-screen text-white">Dashboard</div>
  );
};

export default Dashboard;
