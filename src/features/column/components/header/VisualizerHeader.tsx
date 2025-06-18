import {useCountTurists} from '@/features/column/hooks';

export const VisualizerHeader = () => {
  const {countTurists} = useCountTurists();
  return (
    <>
      <h2>Динамика туристического потока</h2>
      <p>Итого: {countTurists}</p>
    </>
  );
};
