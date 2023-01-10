import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Track } from '../../Models/Tracks';

interface IPlayerState {
  isPlaying : boolean,
  isActive : boolean,
  allSongs : Track[],
  currentSong? : Track,
  indexCurrentSong? : number ,
}

const initialState: IPlayerState = {
  isPlaying : false ,
  isActive : false ,
  allSongs : [],
  currentSong : undefined,
  indexCurrentSong : undefined , 
};



interface PayloadSetActiveSong  {
  allSongs: Track[],
  song: Track 
} 




const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setActiveSong: (state, action: PayloadAction<PayloadSetActiveSong>) => {
        state.allSongs = action.payload.allSongs;
      state.currentSong = action.payload.song;
        state.isActive = true;
        state.isPlaying = true;
        
        for (let index = 0; index < action.payload.allSongs.length; index++) {
          const song = action.payload.allSongs[index];
          if (song.key === action.payload.song!.key) {
            state.indexCurrentSong = index;
          }
        }
    },

    nextSong: (state, action : PayloadAction<number>) => {
      const nextSong = state.allSongs[action.payload];
      if(nextSong) {
        state.currentSong = nextSong;
        state.indexCurrentSong = action.payload;
      }
    },

    prevSong: (state, action) => {
      const prevSong = state.allSongs[action.payload];
      if (prevSong) {
        state.currentSong = prevSong;
        state.indexCurrentSong = action.payload;
      }
    },

    playPause: (state, action : PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },


  },
});

export const { setActiveSong, nextSong, prevSong, playPause } = playerSlice.actions;

export default playerSlice.reducer;



