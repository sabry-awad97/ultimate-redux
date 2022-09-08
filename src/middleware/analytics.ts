import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

const analytics: Middleware<{}, RootState> =
  _storeApi => next => async action => {
    if (!action.meta?.analytics) {
      return next(action);
    }

    const { event, data } = action.meta.analytics;

    try {
      await fakeAnalyticsApi(event, data);
      console.log('Recorded: ', event, data);
    } catch (error: any) {
      console.error(
        'An error occurred while sending analytics: ',
        error.message
      );
    }

    return next(action);
  };

const fakeAnalyticsApi = (_: string, __: { id: string }) =>
  Promise.resolve('Success!');

export default analytics;
