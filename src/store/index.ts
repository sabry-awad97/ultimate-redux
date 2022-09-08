import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from '../middleware/logger';
import tasks from '../reducers';

const reducer = combineReducers({
  tasks,
});

const store = configureStore({
  reducer,
  middleware: gDM => gDM().concat(logger),
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default () => store;
