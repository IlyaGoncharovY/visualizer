import {useMemo} from 'react';

import {useAppSelector} from '@/app/store';

/**
 * Хук для подсчёта общего количества туристов в зависимости от текущих фильтров:
 * выбранных категорий (`selectedCategories`) и флага отображения детей (`showChildren`).
 *
 * Если активен `showChildren`, будут учтены только записи с `withChildren === true`.
 * Иначе считаются только те записи, где категория входит в выбранные, и `withChildren === false`.
 *
 * Результат мемоизируется с помощью `useMemo` для оптимизации производительности.
 *
 * @returns Объект с единственным полем:
 * - `countTurists` — общее количество туристов, прошедших фильтрацию.
 *
 * @example
 * const { countTurists } = useCountTurists();
 * console.log(`Итого туристов: ${countTurists}`);
 */
export const useCountTurists = () => {
  const rawData = useAppSelector((state) => state.column.rawData);
  const selectedCategories = useAppSelector((state) => state.column.selectedCategories);
  const showChildren = useAppSelector((state) => state.column.showChildren);

  const countTurists = useMemo(() => {
    return rawData
      .filter((item) => {
        if (showChildren) return item.withChildren;
        return selectedCategories.includes(item.category) && !item.withChildren;
      })
      .reduce((acc, item) => acc + item.countTurist, 0);
  }, [rawData, selectedCategories, showChildren]);

  return {
    countTurists,
  };
};
