import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterProps {
  title: string;
  arrValue: string[];
}

export interface FilterState {
  filters: FilterProps[];
  min: number;
  max: number;
}

interface AddFilterPayload {
  title: string;
  value: string;
}

const initialState: FilterState = {
  filters: [],
  min: 1000000,
  max: 1000000000,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    addFilter: (state, action: PayloadAction<AddFilterPayload>) => {
      const { title, value } = action.payload;
      const indexFilter = state.filters.findIndex((f) => f.title === title);
      if (indexFilter === -1) {
        state.filters.push({ title, arrValue: [value] });
      } else {
        const indexValue = state.filters[indexFilter].arrValue.findIndex(
          (f) => f === value
        );
        if (indexValue === -1) {
          state.filters[indexFilter].arrValue.push(value);
        } else {
          state.filters[indexFilter].arrValue.splice(indexValue, 1);
          if (state.filters[indexFilter].arrValue.length == 0) {
            state.filters.splice(indexFilter, 1);
          }
        }
      }
    },
    addFilterNumber: (state, action) => {
      const { min, max } = action.payload;
      state.min = min;
      state.max = max;
    },
    clearTitle: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      state.filters.splice(index, 1);
    },
    clearFilter: (state) => {
      state.filters = [];
    },
  },
});

export const { addFilter, clearFilter, clearTitle, addFilterNumber } =
  filterSlice.actions;

export default filterSlice.reducer;
