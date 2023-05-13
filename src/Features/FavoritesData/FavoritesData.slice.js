import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    quantity: 0,
    selected: [],
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
        },
        storeSelected: ( state, selected )  => {
            state.selected = selected.payload;
        }
    }
});

export const {
                storeList,
                storeQuantity,
                storeSelected
            } = favoritesDataSlice.actions;
            
export default favoritesDataSlice.reducer;