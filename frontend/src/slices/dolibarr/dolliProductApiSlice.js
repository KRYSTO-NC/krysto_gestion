import { DOLIBAR_URL } from '../../constants/constants'
import { DOLIBARR_API_KEY } from '../../constants/constants'
import { apiSlice } from '../apiSlice'

export const dolliProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ mode, page, category, variant_filter }) => {
        // Commencez par les paramètres fixes.
        let params = `pagination_data=true&limit=20`

        // Ajoutez les paramètres variables s'ils sont disponibles.
        if (category) {
          params += `&category=${category}`
        }
        if (page !== undefined) {
          params += `&page=${page}`
        }
        if (mode !== undefined) {
          params += `&mode=${mode}`
        }
        if (variant_filter !== undefined) {
          params += `&variant_filter=${variant_filter}`
        }

        // Construisez l'URL complète avec les paramètres.
        return {
          url: `${DOLIBAR_URL}/products?${params}`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),
    getProductCategories: builder.query({
      query: () => ({
        // Ajoutez "variant_filter" comme paramètre ici.
        url: `${DOLIBAR_URL}/categories`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
        params: {
          type: 'product',
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
  useGetProductCategoriesQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliProductApiSlice
