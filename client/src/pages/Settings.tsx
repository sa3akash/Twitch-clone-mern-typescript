import UpdateInfo from "../components/UpdateInfo";
import UpdatePassword from "../components/UpdatePassword";
import UpdateStreamKey from "../components/UpdateStreamKey";

const Settings = () => {

  


  return (
    <div className="flex gap-4 max-w-screen-lg">
      <UpdateInfo />
      <UpdatePassword />
      <UpdateStreamKey />
    </div>
  );
};

export default Settings;
