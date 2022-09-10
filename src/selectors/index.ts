import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Task, TASK_STATUSES } from '../types/Task';

const { UNSTARTED, Completed, IN_PROGRESS } = TASK_STATUSES;

const taskStatuses = [UNSTARTED, Completed, IN_PROGRESS];

const getTasks = (state: RootState) => state.tasks;
const selectProjects = (state: RootState) => state.projects;
const getPage = (state: RootState) => state.page;

const getProjects = createSelector([selectProjects], ({ projects }) =>
  Object.keys(projects).map(id => projects[id])
);

const getSearchTerm = createSelector(
  [getTasks],
  ({ searchTerm }) => searchTerm
);

const getTasksByProjectId = createSelector(
  [selectProjects, getPage, getTasks],
  ({ projects }, { currentProjectId }, { tasks }) => {
    if (!currentProjectId || !projects[currentProjectId]) {
      return [];
    }

    const taskIds = projects[currentProjectId].tasks;
    return taskIds.map(task => tasks[task.id]);
  }
);

// const getTasksByProjectId = createSelector(
//   [selectProjects, getPage],
//   ({ items: projects }, { currentProjectId }) => {
//     if (!currentProjectId) {
//       return [];
//     }

//     const currentProject = projects.find(
//       project => project.id === currentProjectId
//     );

//     return currentProject?.tasks || [];
//   }
// );

export const getFilteredTasks = createSelector(
  [getTasksByProjectId, getSearchTerm],
  (tasks, searchTerm) =>
    tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')))
);

export const getGroupedAndFilteredTasks = createSelector(
  [getFilteredTasks],
  tasks => {
    const grouped = {} as Record<TASK_STATUSES, Task[]>;

    for (const status of taskStatuses) {
      grouped[status] = tasks.filter(task => task.status === status);
    }

    return grouped;
  }
);
