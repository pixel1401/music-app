import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistCard from "../Components/ArtistCard";
import Loader from "../Components/Loader";
import { SongCard } from "../Components/SongCard";
import { ArtistSearch } from "../Models/ISearch";
import { Track } from "../Models/Tracks";
import { useGetSearchSongsQuery } from "../redux/service/shazamCore";




const SearchPage  = ()=> {

    const {value} = useParams();

    const {data , isLoading , isError} = useGetSearchSongsQuery(value , {
        skip : value == undefined
    })


    const [songs , setSongs] = useState<Track[]>([]);
    const [artists , setArtists] = useState<ArtistSearch[]>([]);


    useEffect(()=> {
        if(data) {
            let dataSongs : Track[] = [];
            for(let a of data.tracks.hits) {
                dataSongs.push(a.track);
            }
            setSongs(dataSongs);

            let dataArtists = [];
            for(let a of data.artists.hits) {
                dataArtists.push(a.artist);
            }
            setArtists(dataArtists);
        }

    }, [data])



    if(isLoading) { 
        return <Loader/>
    }


    if (isError) {
        return <h2 className="text-red-600">Error</h2>
    }


    return (
        <>
            <div className="flex flex-col">
                <div className=" w-full justify-between items-center flex flex-col sm:flex-row mt-4 mb-10">
                    <h2 className=" font-bold text-3xl text-white text-left">Search: {value}</h2>
                    
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center  gap-8">
                    {songs?.map(item => {
                        return (
                            <SongCard key={item.key} allSongs={songs} dataSong={item} />
                        )
                    })}
                    {
                        artists.map((item) => {
                            return (
                                <ArtistCard key={item.adamid} img={item.avatar} nameArtist={item.name} id={item.adamid}  />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}


export default SearchPage;