import { fetchTasks, editTask } from './actions';
import configureStore from './store';
import { TASK_STATUSES } from './types/Task';

const store = configureStore();

console.log(store.getState());

store.subscribe(() => {
  console.log('current state: ', store.getState());
});

await store.dispatch(fetchTasks());

store.dispatch(editTask(1, { status: TASK_STATUSES.Completed }));
