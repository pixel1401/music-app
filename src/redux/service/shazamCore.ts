import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, createApi, EndpointDefinitions, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { REHYDRATE } from 'redux-persist';
import { IGenreAndCountry } from '../../Models/IGenresAndCountry';
import { ISongDetails } from '../../Models/ISongDetails';
import { ITracks } from '../../Models/Tracks';





const url = 'https://shazam.p.rapidapi.com';

// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': '95836a2531mshe6f67f0e9691957p1bcb7djsnfca1e843e453',
//         'X-RapidAPI-Host': 'theaudiodb.p.rapidapi.com'
//     }
// };

// fetch(url, options)
//     .then(res => res.json())
//     .then(json => console.log(json))
//     .catch(err => console.error('error:' + err));



export const shazamCoreApi = createApi({
    reducerPath: 'shazamApi',
    
    baseQuery: fetchBaseQuery({ 
        baseUrl: url ,
        prepareHeaders : (headers)=> {
            headers.set('X-RapidAPI-Key', '95836a2531mshe6f67f0e9691957p1bcb7djsnfca1e843e453');
            return headers;
        } 
    
    }),
    
    endpoints: (builder) => ({
        getTopCharts: builder.query<ITracks , string | null>({
            query: (listid?) => ({
                url: '/charts/track' ,
                params : {
                    locale: 'en-US', 
                    pageSize: '20', 
                    startFrom: '0' ,
                    listId : listid ?? ''
                }
            }) ,
            keepUnusedDataFor: 99999999999,
        }),
        getGenresAndCountry: builder.query<IGenreAndCountry , null>({
            query : () => ({
                url: '/charts/list'
            }),
            keepUnusedDataFor: 99999999999,
        }) ,

        getSongDetails : builder.query<ISongDetails , string>({
            query : (songid : string) => ({
                url : '/songs/get-details' ,
                params : {
                    locale: 'en-US',
                    key : songid
                }
            }),
            keepUnusedDataFor: 99999999999,
        })
    }),
})



export const {
    useGetTopChartsQuery ,
    useLazyGetTopChartsQuery ,
    
    useGetGenresAndCountryQuery ,
    useLazyGetGenresAndCountryQuery ,

    useGetSongDetailsQuery,
    useLazyGetSongDetailsQuery
} = shazamCoreApi;






