import s from './Visualizer.module.css';

import {CategoryFilter, ChartWrapper, ChildrenToggleButton, VisualizerHeader} from '@/features/column/components';
import {WrapperContainerByWidth} from '@/shared/components';


export const Visualizer = () => {

  return (
    <div className={s.visualizerContainer}>
      <WrapperContainerByWidth>
        <VisualizerHeader/>
      </WrapperContainerByWidth>
      <WrapperContainerByWidth>
        <CategoryFilter/>
        <ChildrenToggleButton/>
      </WrapperContainerByWidth>
      <ChartWrapper/>
    </div>
  );
};
