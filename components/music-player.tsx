"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const startMusic = () => {
      audio.play().then(() => setIsPlaying(true)).catch(() => undefined);
    };

    startMusic();
    window.addEventListener("pointerdown", startMusic, { once: true });
    window.addEventListener("keydown", startMusic, { once: true });

    return () => {
      window.removeEventListener("pointerdown", startMusic);
      window.removeEventListener("keydown", startMusic);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => undefined);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/invitation-music.mp3" loop preload="auto" />
      <button className="music-toggle" type="button" onClick={toggleMusic} aria-label={isPlaying ? "Pause music" : "Play music"}>
        {isPlaying ? <Volume2 size={17} /> : <VolumeX size={17} />}
        <span>{isPlaying ? "Music on" : "Play music"}</span>
      </button>
    </>
  );
}