import { configureStore, combineReducers } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import analytics from '../middleware/analytics';
import tasks from '../reducers';
import apiMiddleware from '../middleware/api';

const reducer = combineReducers({
  tasks,
});

const store = configureStore({
  reducer,
  middleware: gDM => gDM().concat(apiMiddleware, logger, analytics),
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default () => store;
