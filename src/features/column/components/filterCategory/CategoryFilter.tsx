import {toggleCategory} from '@/features/column/reducer/columnSlice.ts';
import {useAppDispatch, useAppSelector} from '@/app/store';
import {categories} from '@/app/store/data/dataSet.ts';

export const CategoryFilter = () => {
  const dispatch = useAppDispatch();
  const { selectedCategories, showChildren } = useAppSelector(state => state.column);

  if (showChildren) return null;

  return (
    <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
      {categories.map((cat) => (
        <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(cat)}
            onChange={() => dispatch(toggleCategory(cat))}
          />
          {cat}
        </label>
      ))}
    </div>
  );
};
