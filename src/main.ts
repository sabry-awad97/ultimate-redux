import * as actions from './actions';
import { waitFor } from './helpers/waitFor';
import { getFilteredTasks, getGroupedAndFilteredTasks } from './selectors';
import configureStore from './store';

const store = configureStore();

store.dispatch(actions.fetchTasksStarted());
await waitFor(1000);

const searchTerm = 'ea';
store.dispatch(actions.filterTasks(searchTerm));

const filteredTasks = getFilteredTasks(store.getState());
const grouped = getGroupedAndFilteredTasks(store.getState());

console.log(filteredTasks);
console.log(grouped);
