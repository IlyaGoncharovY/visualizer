import {type Action, configureStore, type ThunkAction} from '@reduxjs/toolkit';

import columnReducer from '@/features/column/reducer/columnSlice.ts';

export const store = configureStore({
  reducer: {
    column: columnReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
