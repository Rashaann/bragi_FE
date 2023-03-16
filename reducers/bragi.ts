import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        user: {},
        movies: []
    }
};

export const bragiSlice = createSlice({
    name: 'bragi',
    initialState,
    reducers: {
        addUserToStore: (state, action) => {
            state.value.user = action.payload;
        },
        addMoviesToStore: (state, action) => {
            state.value.movies = action.payload;
        }
    }
});

export const { addUserToStore, addMoviesToStore } = bragiSlice.actions;
export default bragiSlice.reducer;