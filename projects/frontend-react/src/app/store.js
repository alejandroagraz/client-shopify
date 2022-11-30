import {combineReducers, configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import userReducer from '../features/login/loginSlice'
import productReducer from '../features/product/productSlice'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import Global from "../config/Global";

const rootPersistConfig = {
    key: 'root',
    storage,
    devTools: Global.NODE_ENV !== 'production',
    stateReconciler: autoMergeLevel2
};

const userPersistConfig = {
    key: 'login',
    storage,
    whitelist: ['error', 'loading', 'success']
};

const productPersistConfig = {
    key: 'product',
    storage,
    whitelist: ['error', 'loading']
};

const appReducer = combineReducers({
    login: persistReducer(userPersistConfig, userReducer),
    product: persistReducer(productPersistConfig, productReducer)
})

const rootReducer = (state, action) => {
    if (action.type === 'login/logout') {
        storage.removeItem('persist:root')
        state = undefined;
    }
    return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)