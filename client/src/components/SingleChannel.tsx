import { useEffect, useState } from "react";
import { api } from "../http";
import { useLocation, useNavigate } from "react-router-dom";
import { ISingleChannel } from "../interfaces";
import { UserType, useAuth } from "../store/auth";
import VideoPlayer from "./common/VideoPlayer";
import Chat from "./Chat/Chat";

const SingleChannel = () => {
  const [singleChannel, setSingleChannel] = useState<ISingleChannel | null>(
    null
  );

  const location = useLocation()?.pathname?.split("/")[2];
  const navigate = useNavigate();

  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);
  const follow = user?.followedChannel?.some((id) => id === location);

  useEffect(() => {
    api
      .getChannelById(location)
      .then(({ data }) => {
        setSingleChannel(data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [location, navigate]);

  const handleFollow = () => {
    api.followChannel(location);
    let followerArray = [...(user?.followedChannel as string[])];
    if (follow) {
      followerArray = followerArray.filter((id) => id !== location);
    } else {
      followerArray.push(location);
    }
    const finalData = { ...user, followedChannel: followerArray } as UserType;
    setUser(finalData);
  };

  return (
    <div className="w-full h-full flex gap-4">
      <div className="flex-1 p-4">
        <div className="w-full">
          {singleChannel?.isOnline ? (
            <VideoPlayer url={singleChannel.streamUrl} />
          ) : (
            <div className="w-full h-[600px] flex items-center justify-center capitalize border">
              This channel is Offline
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col p-4 gap-1">
            <span className="">
              {singleChannel?.title} --- {singleChannel?.onlineViewer}
            </span>
            <span className="flex items-center gap-4">
              {singleChannel?.name}{" "}
              {user?.channelId !== location && (
                <span
                  onClick={handleFollow}
                  className={
                    !follow
                      ? `text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer`
                      : `text-white bg-rose-700 hover:bg-rose-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer`
                  }
                >
                  {!follow ? "follow" : "Un Follow"}
                </span>
              )}
            </span>
          </div>
          <div className="bg-gray-600 p-4 capitalize rounded-md">
            {singleChannel?.desc}
          </div>
        </div>
      </div>
      <div className="w-[400px] p-4">
        <Chat />
      </div>
    </div>
  );
};

export default SingleChannel;
