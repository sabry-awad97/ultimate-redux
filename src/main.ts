import { fetchTasks, editTask, createTask } from './actions';
import configureStore from './store';
import { TASK_STATUSES } from './types/Task';

const store = configureStore();

console.log(store.getState());

store.subscribe(() => {
  console.log('current state: ', store.getState());
});

// fetching tasks when the app loads
await store.dispatch(fetchTasks());

await store.dispatch(createTask('Peace on Earth', 'No big deal.'));

// Editing tasks in the client not the server
await store.dispatch(
  editTask('rXdwVXhxHLZ7VRAgQ8Lnp', { status: TASK_STATUSES.Completed })
);
