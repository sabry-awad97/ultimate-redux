import { Task } from '../types/Task';
import {
  ActionTypes,
  // FetchTasksStartedAction,
  // FetchTasksFailedAction,
  // FetchTasksSucceededAction,
  CreateTaskSucceededAction,
  EditTaskSucceededAction,
  DeleteTaskSucceededAction,
  EventNames,
} from './types';

// export const fetchTasksStarted = (): FetchTasksStartedAction => ({
//   type: ActionTypes.FETCH_TASKS_STARTED,
// });

// export const fetchTasksFailed = (error: string): FetchTasksFailedAction => ({
//   type: ActionTypes.FETCH_TASKS_FAILED,
//   payload: {
//     error,
//   },
// });

// export const fetchTasksSucceeded = (
//   tasks: Task[]
// ): FetchTasksSucceededAction => ({
//   type: ActionTypes.FETCH_TASKS_SUCCEEDED,
//   payload: {
//     tasks,
//   },
// });

export const createTaskSucceeded = (task: Task): CreateTaskSucceededAction => ({
  type: ActionTypes.CREATE_TASK_SUCCEEDED,
  payload: {
    task,
  },
  // at the same level as type and payload
  meta: {
    analytics: {
      event: EventNames.CREATE_TASK,
      data: {
        id: task.id,
      },
    },
  },
});

export const editTaskSucceeded = (task: Task): EditTaskSucceededAction => ({
  type: ActionTypes.EDIT_TASK_SUCCEEDED,
  payload: {
    task,
  },
});

export const deleteTaskSucceeded = (id: string): DeleteTaskSucceededAction => ({
  type: ActionTypes.DELETE_TASK_SUCCEEDED,
  payload: {
    id,
  },
});
