import { nanoid } from 'nanoid';
import * as api from '../api';
import { AppThunk } from '../types/AppThunk';
import { Task, TASK_STATUSES } from '../types/Task';
import {
  createTaskSucceeded,
  deleteTaskSucceeded,
  editTaskSucceeded,
  fetchTasksSucceeded,
} from './server';
import {
  CreateTaskSucceededAction,
  DeleteTaskSucceededAction,
  EditTaskSucceededAction,
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
  task: Partial<Task> = {}
): AppThunk<Promise<EditTaskSucceededAction>> => {
  return async (dispatch, getState) => {
    const tasks = getState().tasks.tasks;
    const found = tasks.find(task => task.id === id);
    const updatedTask = { ...found, ...task } as Task;
    const { data } = await api.editTask(id, updatedTask);
    return dispatch(editTaskSucceeded(data));
  };
};

export const deleteTask = (
  id: string
): AppThunk<Promise<DeleteTaskSucceededAction>> => {
  return async dispatch => {
    await api.deleteTask(id);
    return dispatch(deleteTaskSucceeded(id));
  };
};

export const fetchTasks = (): AppThunk<Promise<FetchTasksSucceededAction>> => {
  return async dispatch => {
    const { data } = await api.fetchTasks();
    return dispatch(fetchTasksSucceeded(data));
  };
};
