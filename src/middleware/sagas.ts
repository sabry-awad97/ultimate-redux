import { call, takeLatest, put } from 'redux-saga/effects';
import {
  ActionTypes,
  FetchTasksFailedAction,
  FetchTasksSucceededAction,
} from '../actions/types';
import * as api from '../api';

export function* rootSaga() {
  // initialization
  // yield fork(watchFetchTasks);

  // takeLatest cancels old processes when a new one begins
  yield takeLatest(ActionTypes.FETCH_TASKS_STARTED, fetchTasks);
}

function* fetchTasks() {
  // No infinite loop. takeLatest continues to listen for the action type.
  // while (true) {
  // watch for actions
  // yield take(ActionTypes.FETCH_TASKS_STARTED);
  try {
    // call is used for api calls
    const { data } = yield call(api.fetchTasks);

    // put is used for dispatching actions
    yield put<FetchTasksSucceededAction>({
      type: ActionTypes.FETCH_TASKS_SUCCEEDED,
      payload: data,
    });
  } catch (error: any) {
    yield put<FetchTasksFailedAction>({
      type: ActionTypes.FETCH_TASKS_FAILED,
      payload: {
        error: error.message,
      },
    });
  }
  // }
}
