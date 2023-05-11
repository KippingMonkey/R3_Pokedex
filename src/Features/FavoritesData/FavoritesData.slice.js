import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    quantity: 0,
}

const favoritesDataSlice = createSlice({
    name: 'favoritesData',
    initialState,
    reducers: {
        storeList: ( state, list ) => {
            state.list = list.payload;
        },
        storeQuantity: ( state, quantity )  => {
            state.quantity = quantity.payload;
        }
    }
});

export const {
                storeList,
                storeQuantity,
            } = favoritesDataSlice.actions;
            
export default favoritesDataSlice.reducer;