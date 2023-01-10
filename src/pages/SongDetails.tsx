import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { youtube_parser } from "../Models/consts";
import { ISongDetails } from "../Models/ISongDetails";
import { useGetSongDetailsQuery, useLazyGetSongDetailsQuery } from "../redux/service/shazamCore";



export const SongDetails = () => {
    const { songid } = useParams();
    const { data, isLoading, isFetching } = useGetSongDetailsQuery(songid ?? '', {
        skip: songid === undefined
    });

    const [youtubeId , setYouTubeId] = useState('');



    const getYoutubeUri = () => {
        const actions = data?.sections ?? [];
        for(let a of actions) {
            if(a.type === 'VIDEO') {
                setYouTubeId( youtube_parser (a.youtubeurl?.actions[0].uri ?? ''));
            }
        }
    }


    useEffect(()=> {
        getYoutubeUri();
    }, [data])



    if (isLoading || data === undefined) {
        return <h2 className=" font-bold text-white">Loading...</h2>
    }


    return (
        <>
            <div className="flex flex-col mt-5">
                <div className="flex justify-start  items-center  bg-gradient-to-l from-transparent to-black sm:h-48 h-28 p-1">
                    <img src={data.images.coverart} className=" h-full  aspect-square  mr-3 rounded-full border-2 shadow-xl" alt="songImg" />
                    <div className="  flex flex-col justify-around text-white">
                        <h2 className=" font-bold mb-2 sm:text-3xl text-xl  truncate ">{data.title}</h2>
                        <Link to={`/artist/${data.artists[0].adamid}`}>
                            <h5 className="text-base text-gray-400 hover:text-white">{data.subtitle}</h5>
                        </Link>
                        <h5 className="text-base text-gray-400">{data.genres.primary}</h5>
                    </div>
                </div>

                <div className=" mt-4 text-white">
                    <h2 className=" font-bold text-3xl mb-2">LYRICS</h2>
                    
                        {data.sections[1].type === 'LYRICS' 
                            ?  data.sections[1]?.text?.map((item , i)=> {
                                return (
                                    <p key={i} className=" text-gray-400 text-base my-1">{item}</p>
                                )
                            }) 
                            : <div className="text-gray-400 text-base my-1">Not lyrics this song</div>
                        }
                    
                </div>

                <div className="w-full">
                    <iframe className='video w-full aspect-video'
                        title='Youtube player'
                        sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                        src={`https://youtube.com/embed/${youtubeId}?autoplay=0`}>
                    </iframe>
                </div>
                        


                <div className="mt-5">
                    <h2 className=" font-bold text-3xl mb-2">Related Songs</h2>
                </div>
            </div>
        </>
    )
} 