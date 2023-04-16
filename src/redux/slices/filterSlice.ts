import { createSlice } from '@reduxjs/toolkit';

export type FilterState = {
  resources?: string[],
  accessibilityRange?: {
    min: number,
    max: number,
  },
  locationDist?: number,
  locationCoordinates?: number[],
};

const initialState: FilterState = {
  // Empty initial filter
};

const updateFilter = (state: FilterState, set: Partial<FilterState>) => {
  return {
    ...state,
    ...set,
  };
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action) => updateFilter(state, action.payload),
  },
});

export const {
  setFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
