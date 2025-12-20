"use client";
import { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
} from "react-icons/fa";

export default function FarmVideoPlayer({ url}) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [played, setPlayed] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);

  const handleProgress = (state) => {
    if (!state.seeking) setPlayed(state.played);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => console.error(err));
      setFullscreen(true);
    } else {
      document.exitFullscreen().finally(() => setFullscreen(false));
    }
  };

  useEffect(() => {
    if (volume === 0) setMuted(true);
    else setMuted(false);
  }, [volume]);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-xl bg-green-50"
      style={{ paddingBottom: "56.25%" }} // 16:9 ratio
    >
      {/* React Player */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        playing={playing}
        muted={muted}
        volume={volume}
        playbackRate={speed}
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
        controls={false}
        className="rounded-3xl"
        onProgress={handleProgress}
      />

      {/* Overlay Controls */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-green-900/60 to-transparent p-4 gap-3 pointer-events-none">
        {/* Progress Bar */}
        <div className="w-full h-3 rounded-full bg-green-200 overflow-hidden pointer-events-auto">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all"
            style={{ width: `${played * 100}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={() => setPlaying((prev) => !prev)}
              className="relative w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
            >
              {playing ? <FaPause className="text-white text-lg z-10" /> : <FaPlay className="text-white text-lg z-10" />}
            </button>

            {/* Volume */}
            <button
              onClick={() => setMuted((prev) => !prev)}
              className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
            >
              {muted || volume === 0 ? <FaVolumeMute className="text-white" /> : <FaVolumeUp className="text-white" />}
            </button>

            {/* Volume Slider */}
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={muted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-28 h-2 rounded-full accent-green-400"
            />
          </div>

          {/* Speed & Fullscreen */}
          <div className="flex items-center gap-3">
            <select
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="bg-green-700 text-white rounded-md px-2 py-1 text-sm shadow-md"
            >
              <option value={0.5}>0.5x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>

            <button
              onClick={toggleFullscreen}
              className="w-12 h-12 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
            >
              {fullscreen ? <FaCompress className="text-white" /> : <FaExpand className="text-white" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
