import { configureStore } from '@reduxjs/toolkit';
import { createTask } from './actions';
import tasks from './reducers';

const store = configureStore({
  reducer: tasks,
});

console.log(store.getState());

store.subscribe(() => {
  console.log('current state: ', store.getState());
});

store.dispatch(createTask({ title: 'title', description: 'description' }));
