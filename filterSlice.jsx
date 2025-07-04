import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categoryFilter: '',
    searchQuery: '',
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategoryFilter: (state, action) => {
            state.categoryFilter = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        clearAllFilters: (state) => {
            state.categoryFilter = '';
            state.searchQuery = '';
        },
    },
});

export const { setCategoryFilter, setSearchQuery, clearAllFilters } = filterSlice.actions;
export default filterSlice.reducer;