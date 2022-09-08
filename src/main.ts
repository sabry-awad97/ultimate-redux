import * as actions from './actions';
import { waitFor } from './helpers/waitFor';
import configureStore from './store';

const store = configureStore();

store.dispatch(actions.fetchTasksStarted());
await waitFor(1000);

const searchTerm = 'ea';
store.dispatch(actions.filterTasks(searchTerm));

const filteredTasks = store.getState().tasks.tasks.filter(task => {
  return task.title.match(new RegExp(searchTerm, 'i'));
});

console.log(filteredTasks);
