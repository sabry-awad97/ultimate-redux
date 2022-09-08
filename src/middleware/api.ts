import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const CALL_API = 'CALL_API';

const makeCall = async (
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: object
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const params = {
    method,
    url,
    data: body,
    headers: {
      ContentType: 'application/json',
    },
  };
  const response = await axios.request(params);
  return response;
};

const apiMiddleware: Middleware<{}, RootState> =
  _storeApi => next => async action => {
    const callApi = action[CALL_API] as {
      types: string[];
      endpoint: string;
      method?: 'GET' | 'POST';
      body?: object;
    };

    if (!callApi) {
      return next(action);
    }

    next({ type: action.type });

    const { types, endpoint, method, body } = callApi;

    if (typeof endpoint !== 'string') {
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
      const response = await makeCall(endpoint, method, body);
      return next({
        type: successType,
        payload: response.data,
      });
    } catch (error: any) {
      return next({
        type: failureType,
        payload: {
          error: error.message || 'Something bad happened',
        },
      });
    }
  };

export default apiMiddleware;
