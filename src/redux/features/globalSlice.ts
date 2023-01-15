import { createSlice, PayloadAction } from '@reduxjs/toolkit';




export interface IArtist  {
    name : String
    genre : String
    img : string
    key : String
}

type InitStateProps = {
    artists: IArtist[] ,
    currentCountryCode : string
}


const initState: InitStateProps = {
    artists: [] ,
    currentCountryCode : ''
}



const globalSlice = createSlice({
    name: 'globalSlice',
    initialState: initState,
    reducers: {
        pushArtist : (state , action: PayloadAction<IArtist>)  => {
            state.artists = [...state.artists , action.payload];
        } ,

        setCountryCode : (state , action : PayloadAction<string> ) => {
            state.currentCountryCode = action.payload;
        }

    }
})

export const { pushArtist } = globalSlice.actions;

export default globalSlice.reducer;
