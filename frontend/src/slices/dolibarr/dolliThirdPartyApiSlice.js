import { DOLIBAR_URL } from '../../constants/constants'
import { DOLIBARR_API_KEY } from '../../constants/constants'
import { apiSlice } from '../apiSlice'

export const dolliThirdPartyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThirdParties: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/thirdparties`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getThirdPartyDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/thirdparties/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetThirdPartiesQuery,
  useGetThirdPartyDetailsQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliThirdPartyApiSlice
