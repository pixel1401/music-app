import { FC } from "react"
import { Track } from "../Models/Tracks"
import myPhoto from '../assets/myPhoto.jpg';
import { Link } from "react-router-dom";
import { IArtist, pushArtist } from "../redux/features/globalSlice";
import { useDispatch } from "react-redux";



interface ArtistCardProps {
    nameArtist : string
    id : string
    img? : string
}



const ArtistCard: FC<ArtistCardProps> = ({ nameArtist, img, id })=> {

    const dispatch = useDispatch();


    const artistDetails: IArtist = {
        key : id,
        name: nameArtist,
        img: img ?? myPhoto,
        genre: ''
    };



    const handlePushArtist = () => {
        dispatch(pushArtist(artistDetails));
    }
    


    return (
        <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg">
            <div className="relative w-full h-56 group">
                <img src={img ?? myPhoto} className=' block h-[100%] w-[100%] object-cover' alt="song_card" />
            </div>
            <div className=" mt-4 flex flex-col">
                <p className=' text-lg font-semibold text-gray-300 hover:text-white truncate'>
                    <Link to={`/artist/${id}`} onClick={()=> handlePushArtist()} >{nameArtist}</Link>
                </p>
            </div>
        </div>
    )
}


export default ArtistCard