import { Action, ActionTypes } from '../actions/types';
import { Project } from '../types/Project';

const initialState = {
  error: '',
  isLoading: false,
  projects: [] as Project[],
};

export const projects = (
  state = initialState,
  action: Action
): typeof initialState => {
  switch (action.type) {
    case ActionTypes.FETCH_PROJECTS_STARTED:
      return {
        ...state,
        isLoading: true,
      };

    case ActionTypes.FETCH_PROJECTS_SUCCEEDED:
      return {
        ...state,
        isLoading: false,
        projects: action.payload.projects,
      };

    case ActionTypes.CREATE_TASK_SUCCEEDED:
      const { payload } = action;
      const projectIndex = state.projects.findIndex(
        project => project.id === payload.projectId
      );
      const project = state.projects[projectIndex];
      return {
        ...state,
        projects: [
          ...state.projects.slice(0, projectIndex),
          {
            ...project,
            tasks: project.tasks.concat(payload),
          },
          ...state.projects.slice(projectIndex + 1),
        ],
      };

    case ActionTypes.EDIT_TASK_SUCCEEDED: {
      const { task } = action.payload;
      const projectIndex = state.projects.findIndex(
        project => project.id === task.projectId
      );
      const project = state.projects[projectIndex];
      const taskIndex = project.tasks.findIndex(t => t.id === task.id);

      return {
        ...state,
        projects: [
          ...state.projects.slice(0, projectIndex),
          {
            ...project,
            tasks: [
              ...project.tasks.slice(0, taskIndex),
              task,
              ...project.tasks.slice(taskIndex + 1),
            ],
          },
          ...state.projects.slice(projectIndex + 1),
        ],
      };
    }

    default:
      return state;
  }
};
