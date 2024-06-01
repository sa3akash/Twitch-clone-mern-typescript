import { useEffect, useState } from "react";
import Card from "./Card";
import { api } from "../http";
import { IChannels } from "../interfaces";

const Channels = () => {

  const [channelData,setChannelData] = useState<IChannels[]>([])



  useEffect(()=>{
    api.getAllChannel().then(({data})=>{
      setChannelData(data)
    }).catch(err=>{
      console.log(err)
    })
  },[])

  return (
    <div className="flex flex-wrap gap-4 flex-1 overflow-y-auto">
      {channelData.map((item, index) => (
        <Card
          key={index}
          id={item._id}
          title={item.title}
          name={item.name}
          isOnline={item.isOnline}
          avaterUrl={item.avaterUrl}
          desc={item.desc}
        />
      ))}
    </div>
  );
};

export default Channels;
