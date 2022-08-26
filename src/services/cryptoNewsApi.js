import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://bing-news-search1.p.rapidapi.com'

const createRequest = (url) => ({
  url, 
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '269f362027mshf9fb5bf0019f22ap1ca299jsnbeb516c58ab5',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
  }
})

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
