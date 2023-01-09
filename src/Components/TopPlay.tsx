import { FC, useEffect, useRef } from "react"
import { Link } from "react-router-dom";
import { Track } from "../Models/Tracks";
import { useGetGenresAndCountryQuery, useGetTopChartsQuery } from "../redux/service/shazamCore";
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';

import myPhoto from '../assets/myPhoto.jpg';


export const TopPlay: FC = () => {

    const { data, isLoading, isFetching } = useGetTopChartsQuery(null);
    const topPlays = data?.tracks.slice(0, 5);

    const divTopRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        divTopRef.current?.scrollIntoView({ behavior: 'smooth' });
    })


    return (
        <>
            <div ref={divTopRef} className=' xl:ml-6 ml-0 xl:mb-0 mb-6 flex flex-col xl:max-w-[500px] max-w-full flex-1'>
                <div className=" w-full flex flex-col">
                    <div className="flex flex-row  justify-between items-center">
                        <h2 className=" text-white font-bold text-2xl">Top Charts</h2>
                        <Link to={'/top-charts'}>
                            <p className=" text-gray-300 text-base cursor-pointer">See more</p>
                        </Link>
                    </div>
                    <div className="mt-4 flex-col gap-1 flex">
                        {topPlays?.map((item, index) => {
                            return (
                                <TopChartCard key={item.key} song={item} index={index + 1} allSongs={topPlays} />
                            )
                        })}
                    </div>
                </div>


                <div className=" w-full flex flex-col mt-8">
                    <div className="flex flex-row  justify-between items-center">
                        <h2 className=" text-white font-bold text-2xl">Top Artist</h2>
                        <Link to={'/top-artist'}>
                            <p className=" text-gray-300 text-base cursor-pointer">See more</p>
                        </Link>
                    </div>
                    <Swiper
                        slidesPerView={'auto'}
                        spaceBetween={15}
                        freeMode
                        centeredSlides
                        centeredSlidesBounds
                        modules={[FreeMode]}
                        className='mt-4'
                    >   
                    {
                        topPlays?.map((song , index) => {
                            return (
                                <SwiperSlide
                                    key={song.key}
                                    style={{width:'25%' , height:'auto'}}
                                    className=" shadow-lg rounded-full  animate-spin"
                                >
                                    <Link to={`/artists/${song.artists?.[0].adamid}`}>
                                        <img src={song.images?.background ?? myPhoto} className="rounded-full w-full object-cover " style={{aspectRatio: '1/1'}}  alt="artisImg"   />
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                        
                    </Swiper>
                </div>
            </div>
        </>
    )
}





interface TopChartCardProps {
    song: Track,
    index: number,
    allSongs: Track[]
}

const TopChartCard: FC<TopChartCardProps> = ({ song, index, allSongs }) => {


    const { isActive, isPlaying, currentSong } = useAppSelector(state => state.player);


    const dispatch = useAppDispatch();

    const handlePlay = () => {
        dispatch(setActiveSong({ allSongs, song }));
    }

    const handlePause = () => {
        dispatch(playPause(false))
    }






    return (
        <div className=" w-full flex flex-row items-center hover:bg-[#4c426e] py-2 sm:p-4  rounded-lg cursor-pointer mb-2">
            <div className=" font-bold text-base text-white mr-3">{index}</div>
            <img src={song.images?.coverart ?? myPhoto} className='mr-5 rounded-lg sm:w-20 sm:h-20 w-14  h-14  object-cover ' alt="TopChard" />
            <div className="flex-1 flex flex-col items-start text-white mr-1  ">
                <Link to={`/songs/${song.key}`}>
                    <h3 className=" text-xl font-bold truncate">{song.title}</h3>
                </Link>
                <Link to={`/artist/${song.artists?.[0].adamid}`}>
                    <h5 className="text-base  text-gray-300 mt-1">{song.subtitle}</h5>
                </Link>
            </div>
            {
                isActive && isPlaying === true && currentSong?.title === song.title
                    ? <FaPauseCircle onClick={() => handlePause()} size={35} className=" text-gray-300" />
                    : <FaPlayCircle size={35} className="text-gray-300" onClick={() => handlePlay()} />
            }
        </div>
    )
}


