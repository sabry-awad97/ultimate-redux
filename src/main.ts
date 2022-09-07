import { configureStore } from '@reduxjs/toolkit';
import tasks from './reducers';

const store = configureStore({
  reducer: tasks,
});

console.log(store.getState());

store.subscribe(() => {
  console.log('current state: ', store.getState());
});

store.dispatch({
  type: 'CREATE_TASK',
  payload: {
    title: 'title',
    description: 'description',
  },
});
