import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.REACT_APP_RAPID_KEY}`
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({url, headers: cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: () => createRequest('/coins'),
        }),
        getCryptoDetails: builder.query({
            query: (id) => createRequest(`/coin/${id}`),
        }),
        getCryptoHistory: builder.query({
            query: ({id, timePeriod}) => createRequest(`/coin/${id}/history/${timePeriod}`),
        }),
        getGlobalStats: builder.query({
            query: () => createRequest(`/stats/`),
        }),
    })
})

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery, useGetGlobalStatsQuery
} = cryptoApi;