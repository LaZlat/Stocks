import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const financeApiHeader = {
    'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
    'x-rapidapi-key': `${process.env.REACT_APP_RAPID_KEY}`
}

const baseUrl = 'https://mboum-finance.p.rapidapi.com'

const createRequest = (url) => ({url, headers: financeApiHeader})

export const financeApi = createApi({
    reducerPath: 'financeApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getMostActives: builder.query({
            query: () => createRequest('/co/collections/most_actives?start=0'),
        }),
        getStock: builder.query({
            query: (symbol) => createRequest(`/qu/quote?symbol=${symbol}`),
        }),
        getHistory: builder.query({
            query: ({symbol, interval}) => createRequest(`/hi/history?symbol=${symbol}&interval=${interval}`),
        }),
    })
})

export const {
    useGetMostActivesQuery, useGetStockQuery, useGetHistoryQuery
} = financeApi;