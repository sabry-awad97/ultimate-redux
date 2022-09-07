import { configureStore } from '@reduxjs/toolkit';
import tasks from '../reducers';

const store = configureStore({
  reducer: tasks,
});

export default () => store;
