import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        headersImage: [],
        loading: false,
    },
    reducers: {
        headerImageStart: (state) => {
            state.loading = true;
        },
        uploadHeaderImageSuccess: (state) => {
            state.loading = false;
        },
        headerImageSuccess: (state, { payload: { data } }) => {
            state.loading = false;
            state.headersImage = data;
        },
        headerImageRemoveSuccess: (state) => {
            state.loading = false;
        },
        headerImageFailure: (state) => {
            state.loading = false;
        },
    },
});

export const {
    headerImageStart,
    uploadHeaderImageSuccess,
    headerImageRemoveSuccess,
    headerImageSuccess,
    headerImageFailure,
} = settingsSlice.actions;
export default settingsSlice.reducer;