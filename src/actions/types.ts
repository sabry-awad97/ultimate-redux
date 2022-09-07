import { Task } from '../types/Task';

export const enum ActionTypes {
  EDIT_TASK_SUCCEEDED = 'EDIT_TASK_SUCCEEDED',
  CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED',
  DELETE_TASK_SUCCEEDED = 'DELETE_TASK_SUCCEEDED',
  FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED',
  FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED',
  FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED',
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

export interface FetchTasksFailedAction {
  type: ActionTypes.FETCH_TASKS_FAILED;
  payload: {
    error: string;
  };
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
  | FetchTasksFailedAction
  | CreateTaskSucceededAction
  | DeleteTaskSucceededAction;
