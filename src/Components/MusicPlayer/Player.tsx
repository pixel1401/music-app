/* eslint-disable jsx-a11y/media-has-caption */
import React, { FC , useRef, useEffect, useMemo } from 'react';
import musicMy from '../../assets/music/new1.mp4';

interface PlayerProps {
  audioSrc? : string ,
  isPlaying : boolean,
  volume : number 
  onTimeUpdate : (a : number) => void
  onLoadedData : (a : number) => void
  changeTime : number ,
  isChangeTime : boolean ,
  setIsChangeTime: (a: boolean) => void
  isRepeat : boolean ,
  onEnded : () => void
}

export const Player: FC<PlayerProps> = ({ audioSrc, isPlaying, volume, onLoadedData, onTimeUpdate, changeTime, isChangeTime, setIsChangeTime, isRepeat, onEnded }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  if (audioRef.current) {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }


  useEffect(() => {
    if(audioRef) {
      audioRef.current!.volume = volume;
    }
  }, [volume]); 


  // // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    if (audioRef) {
      audioRef.current!.currentTime = changeTime;
      setIsChangeTime(false);
    }
  }, [isChangeTime]);




  return (
    <audio
      ref={audioRef}
      src={audioSrc ?? musicMy}
      loop={isRepeat}
      muted={true}
      onEnded={onEnded}
      onTimeUpdate={(e) => onTimeUpdate(Number(e.currentTarget.currentTime))}
      onLoadedData={(e) =>  onLoadedData(Number(e.currentTarget.duration))}
      
    />
  );
};

