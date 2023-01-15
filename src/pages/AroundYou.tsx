import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../Components/Loader";
import { SongCard } from "../Components/SongCard";
import { useGetCurrentCodeCountryQuery } from "../redux/service/geoCore";
import { useGetGenresAndCountryQuery, useGetTopChartsQuery } from "../redux/service/shazamCore";
import { useAppSelector } from "../redux/store/hooks"



const AroundYou = ()=> {

    const {data , isLoading : isLoadCountry} = useGetCurrentCodeCountryQuery();
    const { data: dataGenresAndCountry, isFetching: isFetchingGenres, isLoading : isLoadListId } = useGetGenresAndCountryQuery(null , {
        skip: data === undefined
    });
    const [dataCode , setDataCode] = useState('');

    const {data : dataSongs , isLoading : isLoadData} = useGetTopChartsQuery(dataCode , {
        skip: dataCode.length == 0
    })




    const getCode = ()=> {
        if (!dataGenresAndCountry?.countries || !data ) return;
        for (let a of dataGenresAndCountry?.countries) {
            if(a.id == data) {
                setDataCode(a.listid ?? '');
                console.log(a , a.listid);
                
            }
        }
    }

    useEffect(()=> {
        getCode();
    }, [dataGenresAndCountry])



    if(isLoadCountry || isLoadData || isLoadListId) {
        return <Loader/>
    }

    return (
        <>
            <div className="flex flex-col">
                <div className=" w-full justify-between items-center flex flex-col sm:flex-row mt-4 mb-10">
                    <h2 className=" font-bold text-3xl text-white text-left">Around You : {data}</h2>
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {dataSongs?.tracks?.map(item => {
                        return (
                            <SongCard key={item.key} allSongs={dataSongs!.tracks} dataSong={item} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}


export default AroundYou