import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from '../redux/features/auth/authSlice.js'
import favoritesReducer from '../redux/features/favourites/favouriteSlice.js'
import { getFavoritesFromLocalStorage } from "../utils/localStorage.js";


const initialFavorites = getFavoritesFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,

},
preloadedState: {
    favorites: initialFavorites,
},
    middleware: (getDefaultMiddleware)=>(
        getDefaultMiddleware().concat(apiSlice.middleware)
    ),
    devTools: true,
})

setupListeners(store.dispatch)
export default store;