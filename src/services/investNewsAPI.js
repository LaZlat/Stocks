import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const investNewsAPIHeader = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '045de38290mshb58ec6d51d4e6a9p1d0760jsn01c573420a6a'
}

  const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

  const createRequest = (url) => ({url, headers: investNewsAPIHeader})

  export const investNewsApi = createApi({
      reducerPath: 'investNewsApi',
      baseQuery: fetchBaseQuery({baseUrl}),
      endpoints: (builder) => ({
        getNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
      })
  })

  export const {useGetNewsQuery} = investNewsApi;
