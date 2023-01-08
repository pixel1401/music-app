import { FC, useState } from "react";
import { nextSong, playPause, prevSong } from "../../redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store/hooks";
import { Controls } from "./Controls";
import { Player } from "./Player";
import { Seekbar } from "./Seekbar";
import { SongCircle } from "./SongCircle";
import VolumeBar from "./VolumeBar";


export const MusicPlayer : FC = ()=> {

    const {allSongs , currentSong , isActive , isPlaying , indexCurrentSong} = useAppSelector((state) => state.player);

    const dispatch = useAppDispatch();

    const [volume, setVolume] = useState(0.3);
    const [duration, setDuration] = useState(0); // All duration song
    const [appTime, setAppTime] = useState(0);  // change song time
    const [isChangeTime, setIsChangeTime] = useState(false);  // 
    const [isRepeat , setIsRepeat] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);



    const handlePlayPause = () => {
        dispatch(playPause(!isPlaying))
    }

    const handleNextSong = ()=> {
        if(allSongs[indexCurrentSong! + 1]) {
            if (!isShuffle) {
                dispatch(nextSong((indexCurrentSong! + 1) % allSongs.length));
            } else {
                dispatch(nextSong(Math.floor(Math.random() * allSongs.length)));
            }
        }
    }

    const handlePrevSong = ()=> {
        if (indexCurrentSong === 0) {
            dispatch(prevSong(allSongs.length - 1));
        } else if (isShuffle) {
            dispatch(prevSong(Math.floor(Math.random() * allSongs.length)));
        } else {
            dispatch(prevSong(indexCurrentSong! - 1));
        }
    }




    return (
        <div className=" absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-10">
            <div className="relative sm:px-12 px-8 w-full flex items-center justify-between">
                <SongCircle imageSrc={currentSong?.images?.coverart}  nameSong= {currentSong?.title ?? ''}  author={currentSong?.subtitle ?? ''} />
                <div className="flex-1 flex flex-col items-center justify-center">
                    <Controls
                        isPlaying={isPlaying}
                        handlePlayPause={handlePlayPause}
                        handleNextSong={handleNextSong}
                        handlePrevSong={handlePrevSong}
                        isRepeat={isRepeat}
                        setRepeat={setIsRepeat}
                        allSong={allSongs}
                        isShuffle={isShuffle}
                        setShuffle={setIsShuffle}
                    />
                    <Seekbar  setIsChangeTime={setIsChangeTime} setAppTime={setAppTime} duration={duration} appTime={appTime}/>
                    <Player 
                        isChangeTime={isChangeTime} 
                        setIsChangeTime={setIsChangeTime}  
                        changeTime={appTime}
                        onLoadedData={setDuration} 
                        onTimeUpdate={setAppTime} 
                        volume={volume} 
                        audioSrc={currentSong?.hub.actions?.[1].uri} 
                        isPlaying={isPlaying}
                        isRepeat={isRepeat}
                        onEnded={handleNextSong}
                    />
                </div>
                <VolumeBar setVolume={setVolume} value={volume} onChange={(event) => setVolume(Number(event.target.value))} />
            </div>
        </div>
    )
}

