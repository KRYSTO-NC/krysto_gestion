import { DOLIBAR_URL } from '../../constants/constants'
import { DOLIBARR_API_KEY } from '../../constants/constants'
import { apiSlice } from '../apiSlice'

export const dolliProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/products`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/products/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliProductApiSlice
