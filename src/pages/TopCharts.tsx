import { FC } from "react";
import Loader from "../Components/Loader";
import { SongCard } from "../Components/SongCard";
import { useGetTopChartsQuery } from "../redux/service/shazamCore";


const TopCharts : FC = () => {
    const {data , isLoading , isError} = useGetTopChartsQuery(null);

    if(isLoading) {
        return <Loader />
    }

    return (
        <>
            <div className="flex flex-col">
                <div className=" w-full justify-between items-center flex flex-col sm:flex-row mt-4 mb-10">
                    <h2 className=" font-bold text-3xl text-white text-left">Top Charts</h2>
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {data?.tracks?.map(item => {
                        return (
                            <SongCard key={item.key} allSongs={data!.tracks} dataSong={item} />
                        )
                    })}
                </div>
            </div>
        </>
    )
}



export default TopCharts;