import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import analytics from '../middleware/analytics';
import { tasks } from '../reducers/tasks';
import { projects } from '../reducers/projects';
// import apiMiddleware from '../middleware/api';
import { rootSaga } from '../middleware/sagas';
import { page } from '../reducers/page';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  tasks,
  projects,
  page,
});

const store = configureStore({
  reducer,
  middleware: gDM => gDM().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

export default () => store;
