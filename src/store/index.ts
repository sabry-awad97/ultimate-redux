import { configureStore, combineReducers } from '@reduxjs/toolkit';
import tasks from '../reducers';

const reducer = combineReducers({
  tasks,
});

const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default () => store;
