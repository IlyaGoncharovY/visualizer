import {type FC, type ReactNode} from 'react';

import s from './WrapperContainerByWidth.module.css';

interface IWrapperContainerByWidth {
  children: ReactNode;
}

export const WrapperContainerByWidth:FC<IWrapperContainerByWidth> = ({
  children,
}) => {
  return (
    <div className={s.wrapperContainerByWidth}>
      {children}
    </div>
  );
};
