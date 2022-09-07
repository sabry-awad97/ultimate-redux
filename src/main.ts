import { configureStore } from '@reduxjs/toolkit';
import { createTask } from './actions';
import tasks from './reducers';
import { TASK_STATUSES } from './types/Task';

const store = configureStore({
  reducer: tasks,
});

console.log(store.getState());

store.subscribe(() => {
  console.log('current state: ', store.getState());
});

store.dispatch(
  createTask(
    'Learn Redux',
    'The store, actions, and reducers, oh my!',
    TASK_STATUSES.IN_PROGRESS
  )
);

store.dispatch(
  createTask('Peace on Earth', 'No big deal.', TASK_STATUSES.IN_PROGRESS)
);
