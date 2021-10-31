import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const financeApiHeader = {
    'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
    'x-rapidapi-key': '045de38290mshb58ec6d51d4e6a9p1d0760jsn01c573420a6a'
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
        })
    })
})

export const {
    useGetMostActivesQuery, useGetStockQuery
} = financeApi;