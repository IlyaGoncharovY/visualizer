import s from './CategoryFilter.module.css';

import type {ChangeEvent} from 'react';

import type {categoryType} from '@/features/column/types';

import {setCategories} from '@/features/column/reducer/columnSlice.ts';
import {useAppDispatch, useAppSelector} from '@/app/store';
import {categories} from '@/app/store/data/dataSet.ts';


export const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { selectedCategories, showChildren } = useAppSelector(state => state.column);

  if (showChildren) return null;

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.currentTarget.value;
    if (value === 'Все туристы') {
      dispatch(setCategories(categories));
    } else {
      dispatch(setCategories([value  as categoryType]));
    }
  };

  const currentValue = selectedCategories.length === categories.length
    ? 'Все туристы'
    : selectedCategories[0];

  return (
    <div className={s.categoryFilterContainer}>
      <select
        value={currentValue}
        onChange={handleChange}
      >
        <option value="Все туристы">Все туристы</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};
