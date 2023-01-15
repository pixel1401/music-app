import { FC } from "react";

import expImg from '../../assets/myPhoto.jpg'


interface SongCircleProps {
    imageSrc?: string,
    nameSong: string,
    author: string,
    isPlaying: boolean
}


export const SongCircle: FC<SongCircleProps> = ({ imageSrc, nameSong, author, isPlaying }) => {
    return (
        <>
            <div className="flex-1 flex items-center justify-start">
                <div style={{ aspectRatio: '1/1' }} className={` ${isPlaying ? 'animate-[spin_3s_linear_infinite]' : ''}  w-12 h-12   mr-2`}>
                    <img src={imageSrc ?? expImg} alt="cover art" className="w-12 h-12 object-cover rounded-full" />
                </div>
                <div className="max-[640px]:max-w-[100px]  sm:max-w-[300px]  ">
                    <p className="truncate text-white font-bold text-lg">
                        {nameSong}
                    </p>
                    <p className="truncate text-gray-300">
                        {author}
                    </p>
                </div>
            </div>
        </>
    )
}
