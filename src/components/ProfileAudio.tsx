"use client";

import { useEffect } from "react";

interface ProfileAudioProps {
  audioUrl: string; // Accept audio URL as a prop
}

const ProfileAudio = ({ audioUrl }: ProfileAudioProps) => {
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.loop = true;
    audio.play();

    // Clean up the audio when the component is unmounted
    return () => {
      audio.pause();
      audio.currentTime = 0; // Reset audio
    };
  }, [audioUrl]); // Rerun effect if audioUrl changes

  return null; // This component just plays audio, so it doesn't render anything
};

export default ProfileAudio;
