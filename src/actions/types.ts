import { Project } from '../types/Project';
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

  FETCH_PROJECTS_STARTED = 'FETCH_PROJECTS_STARTED',
  FETCH_PROJECTS_SUCCEEDED = 'FETCH_PROJECTS_SUCCEEDED',
  FETCH_PROJECTS_FAILED = 'FETCH_PROJECTS_FAILED',

  TIMER_STARTED = 'TIMER_STARTED',
  TIMER_STOPPED = 'TIMER_STOPPED',
  TIMER_INCREMENTED = 'TIMER_INCREMENTED',

  FILTER_TASKS = 'FILTER_TASKS',

  SET_CURRENT_PROJECT_ID = 'SET_CURRENT_PROJECT_ID',
}

export const enum EventNames {
  CREATE_TASK = 'CREATE_TASK',
}

export interface SetCurrentProjectIdAction {
  type: ActionTypes.SET_CURRENT_PROJECT_ID;
  payload: {
    id: number;
  };
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

export interface FetchProjectsStartedAction {
  type: ActionTypes.FETCH_PROJECTS_STARTED;
}

export interface FetchProjectsSucceededAction {
  type: ActionTypes.FETCH_PROJECTS_SUCCEEDED;
  payload: {
    projects: Project[];
  };
}

export interface FetchProjectsFailedAction {
  type: ActionTypes.FETCH_PROJECTS_FAILED;
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

export interface ProgressTimerStartedAction {
  type: ActionTypes.TIMER_STARTED;
  payload: {
    taskId: string;
  };
}

export interface ProgressTimerStoppedAction {
  type: ActionTypes.TIMER_STOPPED;
  payload: {
    taskId: string;
  };
}

export interface ProgressTimerIncrementedAction {
  type: ActionTypes.TIMER_INCREMENTED;
  payload: {
    taskId: string;
  };
}

export interface FilterTasksAction {
  type: ActionTypes.FILTER_TASKS;
  payload: {
    searchTerm: string;
  };
}

export type Action =
  | EditTaskSucceededAction
  | FetchTasksStartedAction
  | FetchTasksSucceededAction
  | FetchTasksFailedAction
  | FetchProjectsStartedAction
  | FetchProjectsSucceededAction
  | FetchProjectsFailedAction
  | SetCurrentProjectIdAction
  | CreateTaskSucceededAction
  | DeleteTaskSucceededAction
  | ProgressTimerStartedAction
  | ProgressTimerIncrementedAction
  | ProgressTimerStoppedAction
  | FilterTasksAction;
