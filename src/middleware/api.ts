import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';
import { Task } from '../types/Task';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CALL_API = 'CALL_API';

const makeCall = async (endpoint: string) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await axios.get<Task[]>(url);
  return response;
};

const apiMiddleware: Middleware<{}, RootState> =
  ({ dispatch }) =>
  next =>
  async action => {
    const callApi = action[CALL_API];
    if (!callApi) {
      return next(action);
    }

    const { types, endpoint } = callApi;

    if (typeof callApi.endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.');
    }

    if (!Array.isArray(types) || types.length !== 3) {
      throw new Error('Expected an array of three action types.');
    }

    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.');
    }

    const [startedType, successType, failureType] = types;

    next({ type: startedType });

    try {
      const response = await makeCall(endpoint);
      next({
        type: successType,
        payload: {
          tasks: response.data,
        },
      });
    } catch (error: any) {
      dispatch({
        type: failureType,
        payload: {
          error: error.message || 'Something bad happened',
        },
      });
    }
  };

export default apiMiddleware;
