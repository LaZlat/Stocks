import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const investNewsVideoAPIHeader = {
    'x-rapidapi-host': 'bing-video-search1.p.rapidapi.com',
    'x-rapidapi-key': '045de38290mshb58ec6d51d4e6a9p1d0760jsn01c573420a6a'
  }

  const baseUrl = 'https://bing-video-search1.p.rapidapi.com';

  const createRequest = (url) => ({url, headers: investNewsVideoAPIHeader})

  export const investNewsVideoApi = createApi({
      reducerPath: 'investNewsVideoApi',
      baseQuery: fetchBaseQuery({baseUrl}),
      endpoints: (builder) => ({
        getNewsVideo: builder.query({
            query: ({newsCategory, count}) => createRequest(`/videos/search?q=${newsCategory}&safeSearch=Off&count=${count}`),
        })
      })
  })

  export const {useGetNewsVideoQuery} = investNewsVideoApi;
