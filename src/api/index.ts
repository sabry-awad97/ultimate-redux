import axios from 'axios';
import { Task } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    ContentType: 'application/json',
  },
});

export const fetchTasks = () => client.get<Task[]>('/tasks');