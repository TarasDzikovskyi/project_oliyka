import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
};

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            const existingUserIndex = state.users.findIndex(
                (user) => user.id === action.payload.id
            );

            if (existingUserIndex === -1) {
                return { ...state, users: [...state.users, action.payload] };
            } else {
                console.warn("User with ID", action.payload.id, "already exists");
                return state;
            }
        },
        removeUsers: () => {
            return initialState;
        },
    },
});

export const { addUser, removeUsers} = usersSlice.actions;

export default usersSlice.reducer