import { Task } from '../types/Task';

export const enum ActionTypes {
  EDIT_TASK_SUCCEEDED = 'EDIT_TASK_SUCCEEDED',
  FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED',
  CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED',
  DELETE_TASK_SUCCEEDED = 'DELETE_TASK_SUCCEEDED',
  FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED',
}

export interface EditTaskSucceededAction {
  type: ActionTypes.EDIT_TASK_SUCCEEDED;
  payload: {
    task: Task;
  };
}

export interface FetchTasksSucceededAction {
  type: ActionTypes.FETCH_TASKS_SUCCEEDED;
  payload: {
    tasks: Task[];
  };
}

export interface FetchTasksStartedAction {
  type: ActionTypes.FETCH_TASKS_STARTED;
}

export interface CreateTaskSucceededAction {
  type: ActionTypes.CREATE_TASK_SUCCEEDED;
  payload: {
    task: Task;
  };
}

export interface DeleteTaskSucceededAction {
  type: ActionTypes.DELETE_TASK_SUCCEEDED;
  payload: {
    id: string;
  };
}

export type Action =
  | EditTaskSucceededAction
  | FetchTasksStartedAction
  | FetchTasksSucceededAction
  | CreateTaskSucceededAction
  | DeleteTaskSucceededAction;
