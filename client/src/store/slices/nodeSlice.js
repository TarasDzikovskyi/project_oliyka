import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    node: null,
};

export const nodeSlice = createSlice({
    name: 'node',
    initialState,
    reducers: {
        addNode: (state, action) => {
            return { ...state, ...action.payload };
        },
        removeNode: () => {
            return initialState;
        },
    },
});

export const { addNode, removeNode} = nodeSlice.actions;

export default nodeSlice.reducer