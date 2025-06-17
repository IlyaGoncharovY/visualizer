import s from './ChildrenToggleButton.module.css';

import {useAppDispatch, useAppSelector} from '@/app/store';
import {toggleChildren} from '@/features/column/reducer/columnSlice.ts';


export const ChildrenToggleButton = () => {
  const dispatch = useAppDispatch();
  const showChildren = useAppSelector(state => state.column.showChildren);

  const onClickToggleHandler = () => dispatch(toggleChildren());

  return (
    <div className={s.childrenToggleButtonContainer}>
      <button
        onClick={onClickToggleHandler}
        style={{
          backgroundColor: showChildren ? 'var(--color-gray)' : 'var(--color-white-200)',
          color: showChildren ? 'var(--color-white-300)' : 'var(--color-info)',
        }}
      >
        {showChildren ? 'Показать все категории' : 'Дети'}
      </button>
    </div>
  );
};
