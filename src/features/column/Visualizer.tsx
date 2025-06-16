
import {CategoryFilter, ChartWrapper, ChildrenToggleButton} from '@/features/column/components';

export const Visualizer = () => {
  return (
    <div style={{padding: '2rem'}}>
      <h2 style={{marginBottom: '1rem'}}>Динамика туристского потока</h2>
      <p>Итого: </p>
      <CategoryFilter/>
      <ChildrenToggleButton/>
      <ChartWrapper/>
    </div>
  );
};
