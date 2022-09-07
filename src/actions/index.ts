import * as api from '../api';
import { AppThunk } from '../types/AppThunk';
import { Task, TASK_STATUSES } from '../types/Task';

import {
  CreateTaskAction,
  ActionTypes,
  EditTaskAction,
  FetchTasksSucceededAction,
} from './types';

let _id = 1;
export const uniqueId = () => _id++;

// Actions are objects describing an event.
// Action creators are functions that return actions.
export const createTask = (
  title: string,
  description: string,
  status?: TASK_STATUSES
): CreateTaskAction => ({
  type: ActionTypes.CREATE_TASK,
  payload: {
    // Side effects can be handled in action creators.
    id: uniqueId(),
    title,
    description,
    status: status || TASK_STATUSES.UNSTARTED,
  },
});

export const editTask = (
  id: number,
  params: {
    status: TASK_STATUSES;
  }
): EditTaskAction => ({
  type: ActionTypes.EDIT_TASK,
  payload: {
    id,
    params,
  },
});

export const fetchTasksSucceeded = (
  tasks: Task[]
): FetchTasksSucceededAction => ({
  type: ActionTypes.FETCH_TASKS_SUCCEEDED,
  payload: {
    tasks,
  },
});

export const fetchTasks =
  (): AppThunk<Promise<FetchTasksSucceededAction>> => dispatch =>
    api.fetchTasks().then(({ data }) => dispatch(fetchTasksSucceeded(data)));
