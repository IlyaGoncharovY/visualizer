import type {Nullable} from '@/shared';

const BAR_KEYS = ['Граждане РФ', 'Граждане стран ближнего зарубежья', 'Граждане стран дальнего зарубежья'] as const;

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
