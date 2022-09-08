import { Task } from '../types/Task';

export enum ActionTypes {
  EDIT_TASK_SUCCEEDED = 'EDIT_TASK_SUCCEEDED',
  DELETE_TASK_SUCCEEDED = 'DELETE_TASK_SUCCEEDED',

  CREATE_TASK_STARTED = 'CREATE_TASK_STARTED',
  CREATE_TASK_SUCCEEDED = 'CREATE_TASK_SUCCEEDED',
  CREATE_TASK_FAILED = 'CREATE_TASK_FAILED',

  FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED',
  FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED',
  FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED',

  TIMER_STARTED = 'TIMER_STARTED',
}

export const enum EventNames {
  CREATE_TASK = 'CREATE_TASK',
}

export interface EditTaskSucceededAction {
  type: ActionTypes.EDIT_TASK_SUCCEEDED;
  payload: {
    task: Task;
  };
}

export interface FetchTasksSucceededAction {
  type: ActionTypes.FETCH_TASKS_SUCCEEDED;
  payload: Task[];
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
  payload: Task;
  meta: {
    analytics: {
      event: EventNames.CREATE_TASK;
      data: {
        id: Task['id'];
      };
    };
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
