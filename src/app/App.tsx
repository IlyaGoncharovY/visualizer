import s from './App.module.css';

import {Visualizer} from '@/features/column/Visualizer.tsx';

export const App = () => {

  return (
    <div className={s.appContainer}>
      <Visualizer/>
    </div>
  );
};
