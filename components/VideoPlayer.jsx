"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Loader2 } from "lucide-react";
const wait = ms => new Promise(res => setTimeout(res, ms));
export function VideoPlayer({
  src,
  poster,
  className = "",
  autoLoad = false
}) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showIcon, setShowIcon] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const attachSource = () => {
    const video = videoRef.current;
    if (!video || hlsRef.current) return;
    const isHls = /\.m3u8(\?|$)/i.test(src);
    if (isHls && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      hlsRef.current = hls;
      hls.on(Hls.Events.BUFFER_APPENDED, () => setIsLoading(false));
    } else {
      // Native HLS (Safari) or plain mp4
      if (!video.src) video.src = src;
    }
  };
  useEffect(() => {
    if (autoLoad) attachSource();
    return () => {
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
  const togglePlay = async e => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    attachSource();
    setShowIcon(true);
    if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = window.setTimeout(() => setShowIcon(false), 2000);
    await wait(300);
    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      return;
    }
    setIsLoading(true);
    video.play().catch(() => setIsLoading(false));
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onPlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };
    const onWaiting = () => setIsLoading(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("pause", onPause);
    return () => {
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("pause", onPause);
      if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    };
  }, []);
  return <div className={`relative w-full h-full group cursor-pointer ${className}`} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={togglePlay}>
      <video ref={videoRef} poster={poster} className="w-full h-full object-cover" playsInline preload="none" loop />

      {isLoading && <div className="absolute inset-0 flex items-center justify-center bg-background/60 z-20 pointer-events-none">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>}

      {!isLoading && <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none z-10 ${isHovered || showIcon ? "opacity-100" : "opacity-0"}`}>
          <button className="play-pause-btn pointer-events-none max-sm:scale-75 text-primary" type="button" aria-label={isPlaying ? "Pause" : "Play"} data-playing={isPlaying}>
            <svg className="play-pause-btn__svg" viewBox="0 0 100 100" width="80px" height="80px" aria-hidden="true">
              <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={7}>
                <circle cx="50" cy="50" r="46" opacity="0.2" />
                <line className="play-pause-btn__svg-line1" x1="42" y1="30" x2="42" y2="70" />
                <line className="play-pause-btn__svg-line2" x1="42" y1="70" x2="70" y2="50" />
                <line className="play-pause-btn__svg-line3" x1="70" y1="50" x2="42" y2="30" />
                <circle className="play-pause-btn__svg-ring1" cx="50" cy="50" r="46" />
                <path className="play-pause-btn__svg-ring2" strokeDasharray="55 365" strokeDashoffset="55" d="M 41.996 4.631 C 41.996 4.631 47.464 3.48 52.3 7.107 C 58.062 11.43 58 18 58 18 L 58 70" />
                <path className="play-pause-btn__svg-ring3" strokeDasharray="40 365" strokeDashoffset="40" d="M 41.996 4.631 C 41.996 4.631 47.464 3.48 52.3 7.107 C 58.062 11.43 58 18 58 18 L 58 76" transform="scale(1, -1)" />
              </g>
            </svg>
          </button>
        </div>}
    </div>;
}
export default VideoPlayer;