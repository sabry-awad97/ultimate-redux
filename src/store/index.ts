import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from '../middleware/logger';
import analytics from '../middleware/analytics';
import tasks from '../reducers';

const reducer = combineReducers({
  tasks,
});

const store = configureStore({
  reducer,
  middleware: gDM => gDM().concat(logger, analytics),
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default () => store;
