import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {GET_PRODUCTS, SEARCH_PRODUCTS} from "../../queries/product/products";
import Global from "../../config/Global";
const uri = Global.API_BASE_URL

export const getProducts = createAsyncThunk(
    'product/list',
    async (arg, {getState, rejectWithValue }) => {
        try {
            const { login } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${login.userToken}`,
                },
            }
            const resp =  await axios.post( uri,
            {
                    query: GET_PRODUCTS
                },
                config
            );
            if (resp.data.data){
                return resp.data.data.getProducts;
            }

            throw new Error(resp.data.errors[0].message)
        } catch (error) {
            if (error.response && error.response.data.errors[0].message) {
                return rejectWithValue(error.response.data.errors[0].message.replace('GraphQL error: ', ''))
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);
export const searchProducts = createAsyncThunk(
    'product/search',
    async ({ search }, { getState, rejectWithValue }) => {
        try {
            const { login } = getState();
            const config = {
                headers: {
                    Authorization: `Bearer ${login.userToken}`,
                },
            }
            const resp =  await axios.post( uri,
                {
                    query: SEARCH_PRODUCTS,
                    variables: {
                        input: {
                            search
                        }
                    },
                },
                config
            );
            if (resp.data.data){
                return resp.data.data.searchProducts;
            }
            throw new Error(resp.data.errors[0].message)
        } catch (error) {
            if (error.response && error.response.data.errors[0].message) {
                return rejectWithValue(error.response.data.errors[0].message.replace('GraphQL error: ', ''))
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);