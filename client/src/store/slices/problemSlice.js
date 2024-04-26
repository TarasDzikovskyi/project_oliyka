import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    problem: null,
};

export const problemSlice = createSlice({
    name: 'problem',
    initialState,
    reducers: {
        addProblem: (state, action) => {
            return {...state, ...action.payload };

            // state.problem = action.payload;
            // state.error = false;
        },
        removeProblem: (state) => {
            return initialState;

            // state.problem = null;
            // state.error = false;
        },
    },
});

export const { addProblem, removeProblem} = problemSlice.actions;

export default problemSlice.reducer