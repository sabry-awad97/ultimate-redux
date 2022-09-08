import {
  call,
  takeLatest,
  put,
  // takeEvery,
  delay,
  actionChannel,
  take,
} from 'redux-saga/effects';
import {
  ActionTypes,
  FetchTasksFailedAction,
  FetchTasksSucceededAction,
  ProgressTimerIncrementedAction,
  ProgressTimerStartedAction,
  ProgressTimerStoppedAction,
} from '../actions/types';
import * as api from '../api';

export function* rootSaga() {
  // initialization
  // yield fork(watchFetchTasks);

  // takeLatest cancels old processes when a new one begins
  yield takeLatest(ActionTypes.FETCH_TASKS_STARTED, fetchTasks);

  // yield takeEvery(ActionTypes.TIMER_STARTED as any, handleProgressTimer);

  yield takeLatestById(
    [ActionTypes.TIMER_STARTED, ActionTypes.TIMER_STOPPED],
    handleProgressTimer
  );
}

function* takeLatestById(actionTypes: ActionTypes[], saga: any) {
  const channelsMap = {} as any;
  while (true) {
    const requestedChannel: unknown = yield actionChannel(actionTypes);
    const { payload, type } = yield take(requestedChannel as any);
    const { taskId } = payload;

    if (!channelsMap[taskId]) {
      channelsMap[taskId] = requestedChannel;
      yield takeLatest(channelsMap[taskId], saga);
    }

    yield put(channelsMap[taskId], { type, payload });
  }
}

function* handleProgressTimer({
  payload,
  type,
}: ProgressTimerStartedAction | ProgressTimerStoppedAction) {
  if (type === ActionTypes.TIMER_STARTED) {
    while (true) {
      yield delay(1000);
      yield put<ProgressTimerIncrementedAction>({
        type: ActionTypes.TIMER_INCREMENTED,
        payload: { taskId: payload.taskId },
      });
    }
  }
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
