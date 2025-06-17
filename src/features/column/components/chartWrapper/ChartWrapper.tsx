import {Bar, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

import {useAppSelector} from '@/app/store';
import {selectFilteredChartData, selectMaxAbsCAGR} from '@/features/column/reducer/columnSelectors.ts';
import {normalizeChartData} from '@/features/column/utils';

export const ChartWrapper = () => {
  const { selectedCategories, showChildren } = useAppSelector((state) => state.column);
  const filteredData = useAppSelector(selectFilteredChartData);
  const maxAbsCAGR = useAppSelector(selectMaxAbsCAGR);
  const normalizedData = normalizeChartData(filteredData, showChildren);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={normalizedData} margin={{ top: 20, right: 50, left: 0, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis yAxisId="left" orientation="left" tickFormatter={(val) => `${val}M`} />
        <YAxis
          yAxisId="right"
          orientation="right"
          tickFormatter={(val) => `${val}%`}
          domain={[-maxAbsCAGR, maxAbsCAGR]}
          tickCount={7}
        />
        <Tooltip />
        <Legend />

        {showChildren
          ? <Bar yAxisId="left" dataKey="Дети" fill="var(--color-near)" />
          : [
            selectedCategories.includes('Граждане РФ') && (
              <Bar key="rf" yAxisId="left" dataKey="Граждане РФ" stackId="a" fill="var(--color-rf)" />
            ),
            selectedCategories.includes('Граждане стран ближнего зарубежья') && (
              <Bar key="near"
                yAxisId="left" dataKey="Граждане стран ближнего зарубежья" stackId="a" fill="var(--color-near)" />
            ),
            selectedCategories.includes('Граждане стран дальнего зарубежья') && (
              <Bar key="far"
                yAxisId="left" dataKey="Граждане стран дальнего зарубежья" stackId="a" fill="var(--color-far)" />
            ),
          ]}

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="CAGR"
          stroke="#ff7300"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          name="Среднегодовой темп роста (%)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
