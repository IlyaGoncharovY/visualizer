import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {Nullable} from '@/shared';
import type {categoryType, visualizerDataType} from '@/features/column/types';

import {visualizerData} from '@/app/store/data/dataSet.ts';

interface ColumnState {
  selectedYear: Nullable<number>;
  selectedCategories: categoryType[];
  showChildren: boolean;
  rawData: visualizerDataType[];
}

const initialState: ColumnState = {
  selectedYear: null,
  selectedCategories: ['Граждане РФ', 'Граждане стран ближнего зарубежья', 'Граждане стран дальнего зарубежья'],
  showChildren: false,
  rawData: visualizerData,
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    setSelectedYear: (state, action: PayloadAction<number>) => {
      state.selectedYear = action.payload;
    },
    toggleCategory: (state, action: PayloadAction<categoryType>) => {
      const index = state.selectedCategories.indexOf(action.payload);
      if (index >= 0) state.selectedCategories.splice(index, 1);
      else state.selectedCategories.push(action.payload);
    },
    toggleChildren: (state) => {
      state.showChildren = !state.showChildren;
    },
  },
});

export const { setSelectedYear, toggleCategory, toggleChildren } = columnSlice.actions;
export default columnSlice.reducer;
