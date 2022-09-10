import { nanoid } from 'nanoid';
import * as api from '../api';
// import { CALL_API } from '../middleware/api';
import { AppThunk } from '../types/AppThunk';
import { Project } from '../types/Project';
import { Task, TASK_STATUSES } from '../types/Task';
import {
  createTaskSucceeded,
  deleteTaskSucceeded,
  editTaskSucceeded,
  progressTimerStarted,
  progressTimerStopped,
  // fetchTasksFailed,
  // fetchTasksSucceeded,
} from './server';
import {
  ActionTypes,
  // ActionTypes,
  CreateTaskSucceededAction,
  DeleteTaskSucceededAction,
  FetchProjectsFailedAction,
  FetchProjectsStartedAction,
  FetchProjectsSucceededAction,
  FilterTasksAction,
  SetCurrentProjectIdAction,
  // EditTaskSucceededAction,
  // FetchTasksFailedAction,
  // FetchTasksSucceededAction,
} from './types';
// import { waitFor } from '../helpers/waitFor';

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
      timer: 0,
    });
    return dispatch(createTaskSucceeded(data));
  };
};

export const editTask = (id: string, task: Partial<Task> = {}): AppThunk => {
  return async (dispatch, getState) => {
    const tasks = getState().tasks.tasks;
    const found = tasks.find(task => task.id === id);
    const updatedTask = { ...found, ...task } as Task;
    const { data } = await api.editTask(id, updatedTask);
    dispatch(editTaskSucceeded(data));

    if (data.status === TASK_STATUSES.IN_PROGRESS) {
      return dispatch(progressTimerStarted(data.id));
    }

    if (task.status === TASK_STATUSES.Completed) {
      return dispatch(progressTimerStopped(data.id));
    }

    return;
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

export const filterTasks = (searchTerm: string): FilterTasksAction => {
  return { type: ActionTypes.FILTER_TASKS, payload: { searchTerm } };
};

export const fetchProjectsStarted = (): FetchProjectsStartedAction => ({
  type: ActionTypes.FETCH_PROJECTS_STARTED,
});

export const fetchProjectsSucceeded = (
  projects: Project[]
): FetchProjectsSucceededAction => ({
  type: ActionTypes.FETCH_PROJECTS_SUCCEEDED,
  payload: { projects },
});

export const fetchProjectsFailed = (
  error: string
): FetchProjectsFailedAction => ({
  type: ActionTypes.FETCH_PROJECTS_FAILED,
  payload: {
    error,
  },
});

export const fetchProjects = (): AppThunk => {
  return async dispatch => {
    dispatch(fetchProjectsStarted());
    try {
      const { data } = await api.fetchProjects();
      return dispatch(fetchProjectsSucceeded(data));
    } catch (error: any) {
      console.error(error);
      return dispatch(fetchProjectsFailed(error.message));
    }
  };
};

export const setCurrentProjectId = (id: number): SetCurrentProjectIdAction => ({
  type: ActionTypes.SET_CURRENT_PROJECT_ID,
  payload: {
    id,
  },
});

// export const fetchTasks = (): AppThunk<
//   Promise<FetchTasksSucceededAction | FetchTasksFailedAction>
// > => {
//   return async dispatch => {
//     try {
//       const { data } = await api.fetchTasks();
//       // await waitFor(2000);
//       // throw new Error('Oh noes! Unable to fetch tasks!');
//       return dispatch(fetchTasksSucceeded(data));
//     } catch (error: any) {
//       return dispatch(fetchTasksFailed(error.message));
//     }
//   };
// };

// const { FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED } =
//   ActionTypes;

// export const fetchTasks = () => {
//   return {
//     type: 'FETCH_TASKS',
//     [CALL_API]: {
//       types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
//       endpoint: '/tasks',
//     },
//   };
// };

// const { CREATE_TASK_STARTED, CREATE_TASK_SUCCEEDED, CREATE_TASK_FAILED } =
//   ActionTypes;
// export const createTask = (
//   title: string,
//   description: string,
//   status = TASK_STATUSES.UNSTARTED
// ) => {
//   return {
//     type: 'CREATE_TASK',
//     [CALL_API]: {
//       types: [CREATE_TASK_STARTED, CREATE_TASK_SUCCEEDED, CREATE_TASK_FAILED],
//       endpoint: '/tasks',
//       method: 'POST',
//       body: {
//         id: nanoid(),
//         title: title,
//         description: description,
//         status: status,
//         timer: 0,
//       },
//     },
//   };
// };
