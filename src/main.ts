import * as actions from './actions';
import { waitFor } from './helpers/waitFor';
import { getFilteredTasks } from './reducers';
import configureStore from './store';

const store = configureStore();

store.dispatch(actions.fetchTasksStarted());
await waitFor(1000);

const searchTerm = 'ea';
store.dispatch(actions.filterTasks(searchTerm));

const filteredTasks = getFilteredTasks(store.getState().tasks.tasks, 'ea');

console.log(filteredTasks);
