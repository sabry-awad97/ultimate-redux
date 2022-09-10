import axios from 'axios';
import { Project } from '../types/Project';
import { Task } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    ContentType: 'application/json',
  },
});

export const fetchTasks = () => client.get<Task[]>('/tasks');
export const createTask = (task: Task) => client.post<Task>('/tasks', task);
export const editTask = (id: string, task: Task) =>
  axios.put<Task>(`${API_BASE_URL}/tasks/${id}`, task);

export const deleteTask = (id: string) =>
  axios.delete<''>(`${API_BASE_URL}/tasks/${id}`);

export const fetchProjects = () => {
  const response = client.get<Project[]>('/projects?_embed=tasks');
  return response;
};
