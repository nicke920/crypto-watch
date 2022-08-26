import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '269f362027mshf9fb5bf0019f22ap1ca299jsnbeb516c58ab5',
  'x-access-token': 'coinrankinge75468e050562614dbcc118caef7dc187465fe84e62c7fc9'
}

const baseUrl = 'https://api.coinranking.com/v2/';

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
