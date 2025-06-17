import type {Nullable} from '@/shared';

const BAR_KEYS = ['Граждане РФ', 'Граждане стран ближнего зарубежья', 'Граждане стран дальнего зарубежья'] as const;

/**
 * Нормализует данные для построения комбинированной диаграммы.
 *
 * Если `showChildren` активен, рассчитывает `CAGR` (среднегодовой темп роста) по количеству детей.
 * В противном случае — сохраняет значения по категориям из `BAR_KEYS` и использует уже рассчитанный `CAGR`.
 *
 * Преобразует каждый объект в формате:
 * ```ts
 * {
 *   year: number;
 *   'Дети'?: number;
 *   'Граждане РФ'?: number;
 *   'Граждане стран ближнего зарубежья'?: number;
 *   'Граждане стран дальнего зарубежья'?: number;
 *   CAGR: number;
 * }
 * ```
 *
 * @param filteredData - Массив отфильтрованных данных (возвращаемых селектором `selectFilteredChartData`).
 * @param showChildren - Флаг, определяющий, отображать ли данные по детям или по категориям.
 * @returns Массив нормализованных объектов, пригодных для визуализации в recharts.
 *
 * @example
 * normalizeChartData([
 *   { year: 2020, 'Дети': 0, CAGR: 0 },
 *   { year: 2021, 'Дети': 0, CAGR: 0 },
 *   { year: 2022, 'Дети': 252, CAGR: 0 }
 * ], true);
 * // => [
 * //   { year: 2020, Дети: 0, CAGR: 0 },
 * //   { year: 2021, Дети: 0, CAGR: 0 },
 * //   { year: 2022, Дети: 252, CAGR: 100 }
 * // ]
 *
 * @example
 * normalizeChartData([
 *   { year: 2020, 'Граждане РФ': 78, 'Граждане стран ближнего зарубежья': 15, CAGR: 0 },
 *   { year: 2021, 'Граждане РФ': 102, 'Граждане стран ближнего зарубежья': 18, CAGR: 23.08 }
 * ], false);
 * // => [
 * //   { year: 2020, 'Граждане РФ': 78, 'Граждане стран ближнего зарубежья': 15,
 * 'Граждане стран дальнего зарубежья': 0, CAGR: 0 },
 * //   { year: 2021, 'Граждане РФ': 102, 'Граждане стран ближнего зарубежья': 18,
 * 'Граждане стран дальнего зарубежья': 0, CAGR: 23.08 }
 * // ]
 */
export const normalizeChartData = (
  filteredData: Array<Record<string, any>>,
  showChildren: boolean,
) => {
  let lastChildrenTotal: Nullable<number> = null;

  return filteredData.map((row, idx) => {
    const filledRow: Record<string, number | string> = {
      year: row.year,
      CAGR: 0,
    };

    if (showChildren) {
      const currentTotal = typeof row['Дети'] === 'number' ? row['Дети'] : 0;
      filledRow['Дети'] = currentTotal;

      if (lastChildrenTotal !== null && lastChildrenTotal > 0) {
        filledRow.CAGR = Number((((currentTotal - lastChildrenTotal) / lastChildrenTotal) * 100).toFixed(2));
      } else if (lastChildrenTotal === 0 && currentTotal > 0 && idx > 1) {
        filledRow.CAGR = 100;
      }

      lastChildrenTotal = currentTotal;
    } else {
      filledRow.CAGR = row.CAGR ?? 0;
      BAR_KEYS.forEach((key) => {
        filledRow[key] = typeof (row as Record<string, number | string>)[key] === 'number'
          ? (row as Record<string, number | string>)[key]
          : 0;
      });
    }

    return filledRow;
  });
};
