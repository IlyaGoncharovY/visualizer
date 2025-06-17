import { describe, it, expect } from 'vitest';


import type { RootState } from '@/app/store/store';
import type { visualizerDataType } from '@/features/column/types';

import {selectFilteredChartData, selectMaxAbsCAGR} from '@/features/column/reducer/columnSelectors.ts';

const mockRawData: visualizerDataType[] = [
  {
    id: 1,
    year: 2020,
    category: 'Граждане РФ',
    countTurist: 100,
    countTuristBeforeYear: 20,
    region: 'Московская область',
    country: 'Россия',
    withChildren: false,
  },
  {
    id: 2,
    year: 2021,
    category: 'Граждане РФ',
    countTurist: 150,
    countTuristBeforeYear: 20,
    region: 'Московская область',
    country: 'Россия',
    withChildren: false,
  },
  {
    id: 3,
    year: 2022,
    category: 'Граждане РФ',
    countTurist: 200,
    countTuristBeforeYear: 20,
    region: 'Московская область',
    country: 'Россия',
    withChildren: false,
  },
  {
    id: 4,
    year: 2022,
    category: 'Граждане РФ',
    countTurist: 252,
    countTuristBeforeYear: 20,
    region: 'Московская область',
    country: 'Россия',
    withChildren: true,
  },
];

describe('selectFilteredChartData', () => {
  it('возвращает данные по категориям с правильным CAGR', () => {
    const state = {
      column: {
        rawData: mockRawData,
        selectedCategories: ['Граждане РФ'],
        showChildren: false,
        selectedYear: null,
      },
    } as RootState;

    const result = selectFilteredChartData(state);

    expect(result).toEqual([
      { year: 2020, 'Граждане РФ': 100, CAGR: 0 },
      { year: 2021, 'Граждане РФ': 150, CAGR: 50 },
      { year: 2022, 'Граждане РФ': 200, CAGR: 33.33 },
    ]);
  });

  it('возвращает данные по детям при showChildren = true', () => {
    const state = {
      column: {
        rawData: mockRawData,
        selectedCategories: ['Граждане РФ'],
        showChildren: true,
      },
    } as RootState;

    const result = selectFilteredChartData(state);

    expect(result).toEqual([
      { year: 2020, Дети: 0, CAGR: 0 },
      { year: 2021, Дети: 0, CAGR: 0 },
      { year: 2022, Дети: 252, CAGR: 0 },
    ]);
  });
});

describe('selectMaxAbsCAGR', () => {
  it('возвращает округлённый вверх максимальный CAGR', () => {
    const state = {
      column: {
        rawData: mockRawData,
        selectedCategories: ['Граждане РФ'],
        showChildren: false,
      },
    } as RootState;

    const result = selectMaxAbsCAGR(state);
    expect(result).toBe(50);
  });

  it('возвращает 10, если CAGR не найдены', () => {
    const emptyState = {
      column: {
        rawData: [],
        selectedCategories: ['Граждане РФ'],
        showChildren: false,
        selectedYear: null,
      },
    } as RootState;

    const result = selectMaxAbsCAGR(emptyState);
    expect(result).toBe(10);
  });
});
