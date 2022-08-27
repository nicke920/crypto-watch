import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createRequest = (url) => ({
  url, 
  headers: {
    'Access-Control-Allow-Origin': '*',
    'x-access-token': 'coinrankinge75468e050562614dbcc118caef7dc187465fe84e62c7fc9'
  }
})

const queryString = new URLSearchParams({
  'x-access-token': 'coinrankinge75468e050562614dbcc118caef7dc187465fe84e62c7fc9'
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://api.coinranking.com/v2', 
    mode: "cors",
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*')
      return headers
    }
   }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}&${queryString}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinUuid) => createRequest(`/coin/${coinUuid}?${queryString}`)
    }),
    getCryptoHistory: builder.query({
      query: ({timePeriod, coinUuid}) => createRequest(`/coin/${coinUuid}/history?timePeriod=${timePeriod}&${queryString}`)
    }),
  })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
