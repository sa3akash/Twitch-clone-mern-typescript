import { FC, useEffect, useRef } from "react";
import flv from "flv.js";

interface Props {
  url: string;
  autoPlay?: boolean;
  muted?: boolean;
}

const VideoPlayer: FC<Props> = ({ url, autoPlay = true, muted = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let flvPlayer: flv.Player;

    if (videoRef.current) {
      flvPlayer = flv.createPlayer({
        type: "flv",
        url: url,
      });
      flvPlayer.attachMediaElement(videoRef.current);
      flvPlayer.load();
      videoRef.current.autoplay = autoPlay; // Enable autoplay
      videoRef.current.muted = muted; // Enable muted
    }

    return () => {
      if (flvPlayer) {
        flvPlayer.unload();
        flvPlayer.detachMediaElement();
        flvPlayer.destroy();
      }
    };
  }, [autoPlay, muted, url]);

  return (
    <div>
      <video ref={videoRef} controls autoPlay />
    </div>
  );
};

export default VideoPlayer;
