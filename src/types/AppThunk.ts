import { ThunkAction } from '@reduxjs/toolkit';
import { Action } from '../actions/types';
import { RootState } from '../store';

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
