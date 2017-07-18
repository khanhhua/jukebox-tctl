import {
  ACTION_SEARCH,
  ACTION_STOP_SEARCHING
} from './search';

const initialState = {
  searching: false
};

export default function uiReducer (state = initialState, action) {
  let newState = state;

  switch (action.type) {
    case ACTION_SEARCH:
      newState = Object.assign({}, state, {
        searching: true
      });
      return newState;

    case ACTION_STOP_SEARCHING:
      newState = Object.assign({}, state, {
        searching: false
      });
      return newState;

    default:
      return newState;
  }
}
