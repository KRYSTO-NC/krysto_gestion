import { DOLIBAR_URL } from '../../constants/constants'
import { DOLIBARR_API_KEY } from '../../constants/constants'
import { apiSlice } from '../apiSlice'

export const dolliWareHousesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouses: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/warehouses`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getWarehouse: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/warehouses/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),

    createWarehouses: builder.mutation({
      query: ({ warehouseData }) => {
        return {
          url: `${DOLIBAR_URL}/warehouses`,
          method: 'POST',
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
          body: warehouseData, // les données du formulaire vont ici
        }
      },
      // invalidatesTags: ['Product'],
    }),
  }),
})

export const {
  useGetWarehousesQuery,
  useGetWarehouseQuery,
  useCreateWarehousesMutation,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliWareHousesApiSlice
