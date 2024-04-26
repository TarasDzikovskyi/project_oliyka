import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    map: null,
};

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        mapStart: (state) => {
            return { ...state, loading: true };
            // state.loading = true;
        },
        addMap: (state, action) => {
            return { ...state, loading: false, map: action.payload, error: false };

            // state.map = action.payload;
            // state.loading = false;
            // state.error = false;
        },
        mapFailure: (state, action) => {
            return {  loading: false, map: null, error: action.payload };

            // state.loading = false;
            // state.error = action.payload;
        },
        removeMap: (state) => {
            return {  loading: false, map: null, error: false };

            // state.map = null;
            // state.loading = false;
            // state.error = false;
        },
    },
});

export const {mapStart, addMap, mapFailure, removeMap } = mapSlice.actions;

export default mapSlice.reducer