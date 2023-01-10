import React from 'react'
import { Link } from 'react-router-dom';
import {  Track } from '../Models/Tracks';
import { useAppSelector } from '../redux/store/hooks';
import { PlayPause } from './PlayPause';

import myPhoto from '../assets/myPhoto.jpg';


interface SongCardProps  {
    dataSong : Track ,
    allSongs: Track[]
}


export const SongCard: React.FC<SongCardProps> = ({ dataSong, allSongs }) => {


    const {isActive , isPlaying , currentSong} = useAppSelector(state => state.player);

    
    const songName = dataSong.title;
    const author = dataSong.subtitle;
    const cardImg = dataSong.images?.coverart ?? myPhoto;
    const bgImg = dataSong.images?.background ?? myPhoto;
    const mp4Music = dataSong.hub?.actions?.[1].uri;

    const songKey = dataSong.key;





    
    




    return (
        <>
            <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
                <div className="relative w-full h-56 group">
                    <div className={`flex absolute inset-0 justify-center items-center group-hover:flex ${currentSong?.title === dataSong.title ? 'bg-black bg-opacity-50'  : 'hidden' } `}>
                        <PlayPause song={dataSong} allSongs={allSongs}/>
                    </div>
                    <img src={cardImg} className=' block h-[100%] w-[100%] object-cover' alt="song_card" />
                </div>
                <div className=" mt-4 flex flex-col">
                    <p className=' text-lg font-semibold text-white truncate'>
                        <Link to={`/songs/${songKey}`}>{songName}</Link>
                    </p>
                    <p className=' text-sm truncate text-gray-300 mt-1'>
                        <Link to={`/`}>{author}</Link>
                    </p>
                </div>
            </div>
        </>
    )
}
