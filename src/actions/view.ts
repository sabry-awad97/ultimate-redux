import { nanoid } from 'nanoid';
import * as api from '../api';
import { AppThunk } from '../types/AppThunk';
import { TASK_STATUSES } from '../types/Task';
import { createTaskSucceeded, fetchTasksSucceeded } from './server';
import {
  ActionTypes,
  CreateTaskSucceededAction,
  EditTaskAction,
  FetchTasksSucceededAction,
} from './types';

// Actions are objects describing an event.
// Action creators are functions that return actions.
export const createTask = (
  title: string,
  description: string,
  status = TASK_STATUSES.UNSTARTED
): AppThunk<Promise<CreateTaskSucceededAction>> => {
  return async dispatch => {
    const { data } = await api.createTask({
      id: nanoid(),
      title: title,
      description: description,
      status: status,
    });
    return dispatch(createTaskSucceeded(data));
  };
};

export const editTask = (
  id: string,
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

export const fetchTasks = (): AppThunk<Promise<FetchTasksSucceededAction>> => {
  return async dispatch => {
    const { data } = await api.fetchTasks();
    return dispatch(fetchTasksSucceeded(data));
  };
};
