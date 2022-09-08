import { Middleware } from '@reduxjs/toolkit';
import { isPromise } from '../helpers/isPromise';
import { isStandardAction } from '../helpers/isSA';
import { RootState } from '../store';

const promiseMiddleware: Middleware<{}, RootState> = ({ dispatch }) => {
  return next => action => {
    if (!isStandardAction(action)) {
      return isPromise(action) ? action.then(dispatch as any) : next(action);
    }

    return isPromise(action.payload)
      ? action.payload
          .then((result: any) => dispatch({ ...action, payload: result }))
          .catch((error: any) => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          })
      : next(action);
  };
};

export default promiseMiddleware;
