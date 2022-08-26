import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createRequest = (url) => ({
  url, 
  headers: {
    'x-access-token': 'coinrankinge75468e050562614dbcc118caef7dc187465fe84e62c7fc9'
  }
})

// 4:42 for explanation

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coinranking.com/v2/' }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query({
      query: (coinUuid) => createRequest(`/coin/${coinUuid}`)
    }),
    getCryptoHistory: builder.query({
      query: ({timePeriod, coinUuid}) => createRequest(`/coin/${coinUuid}/history?timePeriod=${timePeriod}`)
    }),
  })
})

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
