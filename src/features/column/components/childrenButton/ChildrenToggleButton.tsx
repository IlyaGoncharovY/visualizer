import {useAppDispatch, useAppSelector} from '@/app/store';
import {toggleChildren} from '@/features/column/reducer/columnSlice.ts';

export const ChildrenToggleButton = () => {
  const dispatch = useAppDispatch();
  const showChildren = useAppSelector(state => state.column.showChildren);

  return (
    <button
      onClick={() => dispatch(toggleChildren())}
      style={{
        marginBottom: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: showChildren ? '#333' : '#eee',
        color: showChildren ? '#fff' : '#000',
        border: '1px solid #ccc',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
    >
      {showChildren ? 'Показать все категории' : 'Дети'}
    </button>
  );
};
