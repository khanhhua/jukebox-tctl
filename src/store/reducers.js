import { combineReducers } from 'redux'
import locationReducer from './location'

import playbackReducer from '../routes/Home/modules/playback';
import searchReducer from '../routes/Home/modules/search';
import homeUiReducer from '../routes/Home/modules/ui';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    playback: playbackReducer,
    search: searchReducer,
    homeUi: homeUiReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
