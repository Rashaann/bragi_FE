import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        user: {},
        movies: [],
        series: [],
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
        },
        addSeriesToStore: (state, action) => {
            state.value.series = action.payload;
        }
    }
});

export const { addUserToStore, addMoviesToStore, addSeriesToStore } = bragiSlice.actions;
export default bragiSlice.reducer;