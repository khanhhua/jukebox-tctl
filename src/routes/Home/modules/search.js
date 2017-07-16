// ------------------------------------
// Constants
// ------------------------------------
import * as db from 'lib/db';
import debounce from 'debounce-promise';

const ACTION_SEARCH = 'ACTION_SEARCH';

const STATUS_PENDING = 'PENDING';
const STATUS_SUCCESS = 'SUCCESS';
const STATUS_ERROR = 'ERROR';

const debouncedFindSongByTitle = debounce(db.findSongByTitle, 1000, {accumulate: false});

export const actions = {
  searchByTitle: (title) => (dispatch, getState) => {
    dispatch({
      type: ACTION_SEARCH,
      status: STATUS_PENDING,
      payload: title
    });

    if (title) {
      debouncedFindSongByTitle(title).then((songs) => {
        dispatch({
          type: ACTION_SEARCH,
          status: STATUS_SUCCESS,
          payload: songs
        });
      });
    } else {
      dispatch({
        type: ACTION_SEARCH,
        status: STATUS_SUCCESS,
        payload: []
      });
    }
  }
}

const initialState = {
  query: undefined,
  songs: []
};

export default function searchReducer (state = initialState, action) {
  let newState = state;

  if (action.type === ACTION_SEARCH) {
    if (action.status === STATUS_PENDING) {
      newState = Object.assign({}, state, {
        query: action.payload
      })
    }

    if (action.status === STATUS_SUCCESS) {
      newState = Object.assign({}, state, {
        songs: action.payload
      })
    }
  }

  return newState;
}
