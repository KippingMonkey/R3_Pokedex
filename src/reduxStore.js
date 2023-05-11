import { configureStore } from "@reduxjs/toolkit";
import FavoritesDataReducer from "./Features/FavoritesData/FavoritesData.slice";


export const store = configureStore({
    reducer: {
        favoritesData: FavoritesDataReducer,
        
    },
});