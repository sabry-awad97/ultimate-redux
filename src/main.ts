import { configureStore } from '@reduxjs/toolkit';

interface Action {
  type: 'INCREMENT';
}

const counterReducer = (state = 0, action: Action) => {
  if (action.type === 'INCREMENT') {
    return state + 1;
  }

  return state;
};

const store = configureStore({
  reducer: counterReducer,
});

console.log(store.getState());

store.subscribe(() => {
  console.log('current state: ', store.getState());
});

store.dispatch({ type: 'INCREMENT' });
