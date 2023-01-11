import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn, createApi, EndpointDefinitions, FetchArgs, fetchBaseQuery, FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query/react'
import { REHYDRATE } from 'redux-persist';
import { IGenreAndCountry } from '../../Models/IGenresAndCountry';
import { ISongArtist } from '../../Models/ISongArtist';
import { ISongDetails } from '../../Models/ISongDetails';
import { ITracks, Track } from '../../Models/Tracks';





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
    keepUnusedDataFor: 99999999999 * 999999999999,
    baseQuery: fetchBaseQuery({
        baseUrl: url,
        prepareHeaders: (headers) => {
            headers.set('X-RapidAPI-Key', '95836a2531mshe6f67f0e9691957p1bcb7djsnfca1e843e453');
            return headers;
        }

    }),

    endpoints: (builder) => ({
        getTopCharts: builder.query<ITracks, string | null>({
            query: (listid?) => ({
                url: '/charts/track',
                params: {
                    locale: 'en-US',
                    pageSize: '20',
                    startFrom: '0',
                    listId: listid ?? ''
                }
            }),
            keepUnusedDataFor: 99999999999,
        }),
        getGenresAndCountry: builder.query<IGenreAndCountry, null>({
            query: () => ({
                url: '/charts/list'
            }),
            keepUnusedDataFor: 99999999999,
        }),

        getSongDetails: builder.query<ISongDetails, string>({
            query: (songid: string) => ({
                url: '/songs/get-details',
                params: {
                    locale: 'en-US',
                    key: songid
                }
            }),
            keepUnusedDataFor: 99999999999,
        }),
        getSongsArtist: builder.query<Track[], string>({
            query: (adamid: string) => ({
                url: '/artists/get-top-songs',
                params: {
                    id: adamid,
                    l: 'en-US'
                },
            }),
            transformResponse: ({ data }: ISongArtist) => {
                let res: Track[] = [];
                for (let a of data) {
                    let item: Track = {
                        key: a.id,
                        title: a.attributes.name,
                        subtitle: a.attributes.artistName,
                        hub: {
                            type: a.type,
                            image: a.attributes.artwork.url,
                            actions: [
                                {
                                    name: '',
                                    type: ''
                                },
                                {
                                    name: '',
                                    type: '',
                                    uri: a.attributes.previews[0].url
                                }
                            ]
                        },
                        images: {
                            background: a.attributes.artwork.url,
                            coverart: a.attributes.artwork.url,
                            coverarthq: a.attributes.artwork.url,
                            joecolor: a.attributes.artwork.url,
                        }
                    }

                    res.push(item);
                }
                return res;
            },
        })
    }),
})



export const {
    useGetTopChartsQuery,
    useLazyGetTopChartsQuery,

    useGetGenresAndCountryQuery,
    useLazyGetGenresAndCountryQuery,

    useGetSongDetailsQuery,
    useLazyGetSongDetailsQuery,

    useGetSongsArtistQuery
} = shazamCoreApi;






