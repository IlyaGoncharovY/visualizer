import { createSelector } from '@reduxjs/toolkit';

import type { visualizerDataType } from '@/features/column/types';
import type {RootState} from '@/app/store/store.ts';

import { calculateCAGR } from '@/features/column/utils';

export const selectRawData = (state: RootState) => state.column.rawData;
export const selectCategories = (state: RootState) => state.column.selectedCategories;
export const selectShowChildren = (state: RootState) => state.column.showChildren;

export const selectFilteredChartData = createSelector(
  [selectRawData, selectCategories, selectShowChildren],
  (data, selectedCategories, showChildren) => {
    const years = [...new Set(data.map(d => d.year))].sort();

    return years.map((year) => {
      const current = data.filter((d) => d.year === year);
      const previous = data.filter((d) => d.year === year - 1);

      const getSum = (arr: visualizerDataType[]) =>
        arr.reduce((sum, item) => sum + item.countTurist, 0);

      if (showChildren) {
        const currentTotal = getSum(current.filter(d => d.withChildren));
        const previousTotal = getSum(previous.filter(d => d.withChildren));
        return {
          year,
          'Дети': currentTotal,
          'CAGR': previousTotal > 0
            ? Number(calculateCAGR(currentTotal, previousTotal).toFixed(2))
            : 0,
        };
      }

      const currentByCategory = selectedCategories.reduce((acc, category) => {
        const sum = getSum(current.filter(d => d.category === category && !d.withChildren));
        acc[category] = sum;
        return acc;
      }, {} as Record<string, number>);

      const totalCurrent = getSum(current.filter(d => selectedCategories.includes(d.category) && !d.withChildren));
      const totalPrevious = getSum(previous.filter(d => selectedCategories.includes(d.category) && !d.withChildren));

      return {
        year,
        ...currentByCategory,
        'CAGR': totalPrevious > 0
          ? Number(calculateCAGR(totalCurrent, totalPrevious).toFixed(2))
          : 0,
      };
    });
  },
);

export const selectMaxAbsCAGR = createSelector(
  [selectFilteredChartData],
  (filteredData) => {
    const cagrValues = filteredData
      .map(d => d.CAGR)
      .filter((v): v is number => typeof v === 'number' && !isNaN(v));

    if (cagrValues.length === 0) return 10;

    return Math.ceil(Math.max(...cagrValues.map(v => Math.abs(v)), 10));
  },
);
