import {createSlice} from '@reduxjs/toolkit'
import {login} from './loginAction'

const initialState = {
    loading: null,
    userToken: null,
    loginInfo: null,
    error: null,
    success: false,
}
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: () => {},
    },
    extraReducers: {
        //login user
        [login.pending]: (state) => {
            state.loading = 'Autenticando...'
            state.error = null
        },
        [login.fulfilled]: (state, { payload }) => {
            state.loading = null
            state.error = null
            state.loginInfo = payload
            state.userToken = payload
        },
        [login.rejected]: (state, { payload }) => {
            state.loading = null
            state.error = payload
        },
    },
})
export const { logout } = loginSlice.actions
export default loginSlice.reducer
