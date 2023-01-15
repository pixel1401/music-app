import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';




export const geoCore = createApi({
    reducerPath : 'geoCore' ,
    keepUnusedDataFor : 9999999999*99999999999,
    baseQuery : fetchBaseQuery({
        baseUrl: 'https://geo.ipify.org/api/v2' ,
    }),
    endpoints : (builder) => ({
        getCurrentCodeCountry : builder.query<any , void>({
            query : ()=> ({
                url: '/country?apiKey=at_BjdjORlpsU4pQnJFIwGW6s7MprFWU&' ,
                
            }),
            transformResponse: (data : any) => {
                return data.location.country;
            }
        })
    })
})


export const {
    useGetCurrentCodeCountryQuery
} = geoCore;