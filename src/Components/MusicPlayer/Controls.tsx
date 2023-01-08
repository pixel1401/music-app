import { FC } from "react";
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import { Track } from "../../Models/Tracks";



interface ControlsProps {
    isPlaying : boolean ,
    setRepeat: React.Dispatch<React.SetStateAction<boolean>>
    setShuffle: React.Dispatch<React.SetStateAction<boolean>>
    isRepeat : boolean ,
    isShuffle : boolean,
    allSong : Track[] ,
    handlePrevSong : () => void ,
    handleNextSong : () => void ,
    handlePlayPause : () => void ,
    
}


export const Controls: FC<ControlsProps> = ({ isPlaying,  isShuffle , setRepeat, isRepeat, allSong, handlePrevSong, handleNextSong, handlePlayPause, setShuffle }) => {
    return (
        <>
            
            <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
                <BsArrowRepeat size={20} color={isRepeat ? 'red' : 'white'} onClick={() => setRepeat((prev : boolean ) => !prev)} className="hidden sm:block cursor-pointer" />
                { <MdSkipPrevious  size={30} color="#FFF" className="cursor-pointer" onClick={handlePrevSong} />}
                {isPlaying ? (
                    <BsFillPauseFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
                ) : (
                    <BsFillPlayFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
                )}
                { <MdSkipNext size={30} color="#FFF" className="cursor-pointer" onClick={handleNextSong} />}
                <BsShuffle size={20} color={isShuffle ? 'red' : 'white'} onClick={() => setShuffle((prev) => !prev)} className="hidden sm:block cursor-pointer" />
            </div>
        </>
    )
}