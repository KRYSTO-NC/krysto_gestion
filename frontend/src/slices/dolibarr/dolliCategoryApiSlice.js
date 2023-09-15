import { DOLIBAR_URL } from '../../constants/constants'
import { DOLIBARR_API_KEY } from '../../constants/constants'
import { apiSlice } from '../apiSlice'

export const dolliContactApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/categories`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getCategory: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/categories/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),

    createCategory: builder.mutation({
      query: ({ categoryData }) => {
        return {
          url: `${DOLIBAR_URL}/categories`,
          method: 'POST',
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
          body: categoryData, // les données du formulaire vont ici
        }
      },
      // invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,

  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliContactApiSlice
