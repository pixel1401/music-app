import React, { FC } from 'react';



interface SeekbarProps {
  appTime : number ,
  duration : number ,
  setAppTime : (a : number) => void ,
  setIsChangeTime : (a : boolean) => void
}

export const Seekbar: FC<SeekbarProps> = ({ appTime, duration, setAppTime, setIsChangeTime, }) => {
  // converts the time to format 0:00
  const getTime = (time : number) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;


  const handelChangeTime = (time ? : number)=> {
    if(time) {
      setIsChangeTime(true);
      setAppTime(time);
    }
  }

  return (
    <div className="hidden sm:flex flex-row items-center">
      <button type="button" onClick={() => handelChangeTime(appTime - 5 > 0 ? appTime - 5 : undefined )} className="hidden lg:mr-4 lg:block text-white">
        -
      </button>
      <p className="text-white">{appTime === 0 ? '0:00' : getTime(appTime)}</p>
      <input
        type="range"
        step="any"
        value={appTime}
        min={0}
        max={duration}
        onInput={(e) => {
          handelChangeTime(Number(e.currentTarget.value))
        } 
      }
        className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{duration === 0 ? '0:00' : getTime(duration)}</p>
      <button type="button" onClick={() => handelChangeTime(appTime + 5 < duration ? appTime + 5 : undefined)} className="hidden lg:ml-4 lg:block text-white">
        +
      </button>
    </div>
  );
};

