import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        user: {},
        movies: [],
        series: [],
        channels: [],
        search: '',
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
        },
        addChannelsToStore: (state, action) => {
            state.value.channels = action.payload;
        },
        searchText: (state, action) => {
            state.value.search = action.payload;
        },
        logout: (state) => {
            state.value.user = {};
        }
    }
});

export const { addUserToStore, addMoviesToStore, addSeriesToStore, addChannelsToStore, searchText, logout } = bragiSlice.actions;
export default bragiSlice.reducer;
