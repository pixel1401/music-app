import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import { SongCard } from "../Components/SongCard";

import { Genre } from "../Models/IGenresAndCountry";
import { ITracks } from "../Models/Tracks";
import { shazamCoreApi, useGetGenresAndCountryQuery , useLazyGetGenresAndCountryQuery, useLazyGetTopChartsQuery } from "../redux/service/shazamCore";
import { useAppSelector } from "../redux/store/hooks";

const Discover = () => {    

    let [fetchGetSongs , {data  , isFetching , isError }] = useLazyGetTopChartsQuery();
    const [dataSongs , setDataSongs] = useState(data);


    
    const dataStore = useAppSelector(state => state.shazamApi);

    // console.log(dataStore.queries?.["getTopCharts(\"genre-global-chart-1\")"]?.data?);

    
    
    const { data: dataGenresAndCountry, isFetching: isFetchingGenres, isLoading } = useGetGenresAndCountryQuery(null);
    let genres: Genre[] = dataGenresAndCountry?.global.genres ?? [];
    



    
    const [fetchGenre, setFetchGenre] = useState<string | null>();
    const [selectedGenre, setSelectedGenre] = useState<string>();



    const getTrackLocal = (listid : string) => {
        return dataStore.queries?.[`getTopCharts(\"${listid}\")`]?.data as ITracks ?? undefined;
    }

    const initData = async () => {
        setFetchGenre(genres?.[0]?.listid ?? null);
        setSelectedGenre(genres?.[0]?.name ?? '');
    }

    useEffect (()=> {
        initData();
    }, [dataGenresAndCountry ])

    
    useEffect(()=> {
        if (fetchGenre) {
            if (getTrackLocal(fetchGenre)) {
                setDataSongs(getTrackLocal(fetchGenre));
            }else {
                fetchGetSongs(fetchGenre );
            }
        }
    }, [fetchGenre , data])


    if (isFetching || isFetchingGenres || isLoading) {
        return <Loader/>
    }


    return (
        <div className="flex flex-col">
            <div className=" w-full justify-between items-center flex flex-col sm:flex-row mt-4 mb-10">
                <h2 className=" font-bold text-3xl text-white text-left">Discover {selectedGenre}</h2>
                <select onChange={(e)=> {
                    setFetchGenre(e.currentTarget.value);
                    setSelectedGenre( e.currentTarget.options[e.currentTarget.selectedIndex].text );
                }}
                    className=" bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres.map(item=> {
                        return (
                            <option selected={item.name === selectedGenre}   key={item.id}  value={item.listid}>{item.name}</option>
                        )
                    })}
                </select>
            </div>
            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {dataSongs?.tracks?.map(item => {
                        return (
                            <SongCard key={item.key} allSongs={dataSongs!.tracks}  dataSong={item}/>
                        )
                    })}
            </div>
        </div>
    )
    

} 

export default Discover;
