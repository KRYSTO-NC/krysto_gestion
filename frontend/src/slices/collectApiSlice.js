import { COLLECT_URL } from '../constants/constants'
import { apiSlice } from './apiSlice'

export const collectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollects: builder.query({
      query: () => ({
        url: `${COLLECT_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCollectDetails: builder.query({
      query: (id) => ({
        url: `${COLLECT_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetCollectDetailsQuery,
  useGetCollectsQuery,
} = collectApiSlice
