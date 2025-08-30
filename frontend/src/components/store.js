import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from '../Slices/productsSlice';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import formReducer from '../Slices/formSlice'; 
import authReducer from '../Slices/authSlice'; 
import cartReducer from "../Slices/cartSlice";

 const persistConfig = {
        key:'root',
        storage
    };

const rootReducer = combineReducers({
    products:productsReducer,
    form:formReducer,
    auth: authReducer,
    cart: cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
// storage.removeItem('persist:root');

export default store
export const persistor = persistStore(store)