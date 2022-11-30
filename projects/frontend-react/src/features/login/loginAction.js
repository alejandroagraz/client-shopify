import {createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {AUTENTICAR_USUARIO} from "../../queries/Login/login";
import Global from "../../config/Global";
const uri = Global.API_BASE_URL
export const login = createAsyncThunk(
    'login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const resp =  await axios.post(uri, {
                query: AUTENTICAR_USUARIO,
                variables: {
                    input: {
                        username,
                        password
                    }
                },
            });
            if (resp.data.data){
                const { access_token } = resp.data.data.authenticateUser;
                return access_token;
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
