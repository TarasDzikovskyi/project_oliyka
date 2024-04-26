import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    isAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.isAuth = true;
            state.error = false;
        },
        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        login: (state, action) => {
            state.user = action.payload;
            state.isAuth = true
        },
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.isAuth = false;
            state.error = false;
        },
    },
});

export const {login, loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;

export default userSlice.reducer