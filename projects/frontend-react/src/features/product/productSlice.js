import { createSlice } from '@reduxjs/toolkit'
import { getProducts, searchProducts } from './productAction'
const initialState = {
    loading: false,
    products: null,
    error: null,
    success: false,
}
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: {
        // list products.js
        [getProducts.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        [getProducts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.products = payload
            state.success = true
        },
        [getProducts.rejected]: (state, { payload }) => {
            state.loading = false
            state.error = payload
        },
        // search products.js
        [searchProducts.pending]: (state) => {
            state.loading = true
        },
        [searchProducts.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.products = payload
        },
        [searchProducts.rejected]: (state, { payload }) => {
            state.loading = false
        },
    },
})
export default productSlice.reducer
