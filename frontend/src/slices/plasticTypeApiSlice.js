import { PLASTIC_TYPE_URL } from '../constants/constants'
import { apiSlice } from './apiSlice'

export const plasticTypeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlasticTypes: builder.query({
      query: () => ({
        url: `${PLASTIC_TYPE_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPlasticTypeDetails: builder.query({
      query: (id) => ({
        url: `${PLASTIC_TYPE_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetPlasticTypesQuery,
  useGetPlasticTypeDetailsQuery,
} = plasticTypeApiSlice
