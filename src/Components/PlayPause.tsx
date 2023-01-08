import { FC } from "react";

import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { Track } from "../Models/Tracks";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";


interface PlayPauseProps {
  allSongs: Track[]
  song: Track
}

export const PlayPause: FC<PlayPauseProps> = ({ song, allSongs }) => {
  
  const {isActive , isPlaying , currentSong} = useAppSelector(state => state.player);

  const dispatch = useAppDispatch();

  const handlePlay = ()=> {
    dispatch(setActiveSong({ allSongs, song }));
  }

  const handlePause = () => {
    dispatch(playPause(false))
  }

  
  return (
    <>
      {
        isActive && isPlaying === true  && currentSong?.title === song.title 
          ? <FaPauseCircle onClick={() => handlePause()} size={35} className=" text-gray-300"/>
          : <FaPlayCircle size={35} className="text-gray-300" onClick={() => handlePlay()}/> 
      }
    </>
  )
}