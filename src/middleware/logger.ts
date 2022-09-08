import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

const logger: Middleware<{}, RootState> = storeApi => next => action => {
  console.group(action.type);

  console.log('dispatching: ', action);

  const result = next(action);

  console.log('next state: ', storeApi.getState());

  console.groupEnd();

  return result;
};

export default logger;
