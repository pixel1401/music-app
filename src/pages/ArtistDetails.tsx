import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../Components/Loader";
import { TopChartCard } from "../Components/TopPlay";
import { IArtist } from "../redux/features/globalSlice";
import { useGetSongsArtistQuery } from "../redux/service/shazamCore";

import { useAppSelector } from "../redux/store/hooks";


const ArtistDetails: FC = () => {
    const { artistId } = useParams();
    const { artists } = useAppSelector(state => state.globalSlice);

    const [artistInfo, setArtistInfo] = useState<IArtist>();
    const { data: artistSong , isLoading } = useGetSongsArtistQuery(artistId ?? '', {
        skip: artistId == undefined
    })

    const findArtistOnId = () => {
        if (!artistId || artists.length <= 0) return;

        for (let a of artists) {
            if (a.key === artistId) {
                setArtistInfo(a);
                break;
            }
        }
    }


    useEffect(() => {
        findArtistOnId();
    }, [artistId])



    if (isLoading) {
        return <>
            <Loader/>
        </>
    }


    if (artistInfo == null || artistInfo == undefined) {
        return <>
            <h1 className=" text-white">Not Artist INFO</h1>
        </>
    } else {
        return (
            <>
                <div className='flex flex-col mt-5'>
                    <div className="flex justify-start  items-center  bg-gradient-to-l from-transparent to-black sm:h-48 h-28 p-1">
                        <img src={artistInfo.img} className=" h-full  aspect-square  mr-3 rounded-full border-2 shadow-xl" alt="songImg" />
                        <div className="  flex flex-col justify-around text-white">
                            <h2 className=" font-bold mb-2 sm:text-3xl text-xl  truncate ">{artistInfo.name}</h2>
                        </div>
                    </div>
                    <div className="mt-5">
                        <h2 className=" font-bold text-3xl mb-2 text-white">{artistInfo.name} Songs</h2>
                        {
                            artistSong?.map((song, i) => {
                                return (
                                    <TopChartCard key={song.key} song={song} allSongs={artistSong} index={i + 1} isDisabledLink={true} />
                                )
                            })
                        }
                    </div>
                </div>
            </>
        )
    }





}

export default ArtistDetails;