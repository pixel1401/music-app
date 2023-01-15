import ArtistCard from "../Components/ArtistCard";
import Loader from "../Components/Loader";
import { useGetTopChartsQuery } from "../redux/service/shazamCore";


const TopArtists = ()=> {


    const { data, isLoading, isFetching } = useGetTopChartsQuery(null);


    
    if(isLoading) {
        return <Loader/>
    }



    return (
        <>
            <div className=" flex flex-col">
                <div className=" w-full justify-between items-center flex flex-col sm:flex-row mt-4 mb-10">
                    <h2 className=" font-bold text-3xl text-white text-left">Top Artists</h2>
                </div>
                <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                    {data?.tracks?.map(item => {
                        return (
                            <ArtistCard key={item.key} data={item}  />
                        )
                    })}
                </div>
            </div>
        </>
    )
}



export default TopArtists;