// ------------------------------------
// Constants
// ------------------------------------
import * as db from 'lib/db';

export const PLAYBACK_STATUS_UNLOADED = 'UNLOADED';
export const PLAYBACK_STATUS_LOADED = 'LOADED';
export const PLAYBACK_STATUS_PLAYING = 'PLAYING';
export const PLAYBACK_STATUS_PAUSED = 'PAUSED';

const ACTION_LOAD_PLAYLIST = 'ACTION_LOAD_PLAYLIST';
const ACTION_LOAD_ALBUMS = 'ACTION_LOAD_ALBUMS';

const ACTION_SELECT_SONG = 'ACTION_SELECT_SONG';

const ACTION_REQUEST_PLAY_SONG = 'ACTION_REQUEST_PLAY_SONG';
const ACTION_PLAY_SONG = 'ACTION_PLAY_SONG';
const ACTION_REQUEST_PAUSE_SONG = 'ACTION_REQUEST_PAUSE_SONG';
const ACTION_PAUSE_SONG = 'ACTION_PAUSE_SONG';

const STATUS_PENDING = 'PENDING';
const STATUS_SUCCESS = 'SUCCESS';
const STATUS_ERROR = 'ERROR';

// ------------------------------------
// Actions
// ------------------------------------

function ensureAudioElement (dispatch, song) {
  let audioElement;
  if (window.audioPlayer) {
    audioElement = window.audioPlayer;
    
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.setAttribute('autoplay', true);
      audioElement.setAttribute('src', song.mediaLink);
    }
  } else {
    audioElement = document.createElement('AUDIO');
    audioElement.setAttribute('autoplay', true);
    audioElement.setAttribute('src', song.mediaLink);
    
    window.document.body.appendChild(audioElement);
    window.audioPlayer = audioElement;
  }
  
  audioElement.onplaying = function () {
    dispatch({
      type: ACTION_PLAY_SONG,
      payload: song
    });
  };
  
  audioElement.onpause = function () {
    dispatch({
      type: ACTION_PAUSE_SONG,
      payload: song
    });
  };
}

export const actions = {
  loadAlbums: () => (dispatch, getState) => {
    dispatch({
      type: ACTION_LOAD_PLAYLIST,
      status: STATUS_PENDING
    });
    
    const url = `https://fatmandesigner-blog.cloudant.com/hymnals/_design/album/_view/public-albums?limit=10&reduce=false`;
    db.getAlbums().then(data => {
      dispatch({
        type: ACTION_LOAD_ALBUMS,
        status: STATUS_SUCCESS,
        payload: data
      });
      
      if (!(data.length)) {
        return;
      }

      const defaultAlbum = data.find(item => item.id === 'album-tvchh');
      if (!(defaultAlbum && defaultAlbum.songs && defaultAlbum.songs.length)) {
        return;
      }

      db.getSongsByIds(defaultAlbum.songs).then(songs => {
        dispatch({
          type: ACTION_LOAD_PLAYLIST,
          status: STATUS_SUCCESS,
          payload: songs
        });
      });
    })
  },
  
  selectFirstSong: () => (dispatch, getState) => {
    dispatch({
      type: ACTION_SELECT_SONG,
      payload: 'DEFAULT'
    });
    
    setTimeout(() => {
      let {playback: {current: song}} = getState();
      
      ensureAudioElement(dispatch, song);
    }, 300);
  },
  play: (song) => (dispatch) => {
    dispatch({
      type: ACTION_REQUEST_PLAY_SONG,
      payload: song
    });

    ensureAudioElement(dispatch, song);
  },
  pause: () => {
    if (window.audioPlayer) {
      window.audioPlayer.pause();
    }
    
    return {
      type: ACTION_REQUEST_PAUSE_SONG,
    };
  }
};

const initialState = {
  current: {
    status: 'UNLOADED'
  },
  playlist: [],
  albums: []
};

export default function playbackReducer (state = initialState, action) {
  let newState;
  
  switch (action.type) {
    case '@@redux/init':
      return state;
    case ACTION_LOAD_ALBUMS:
      if (action.status !== STATUS_SUCCESS) {
        return state;
      }

      newState = Object.assign({}, state, {
        albums: action.payload
      });
      return newState;
      
    case ACTION_LOAD_PLAYLIST:
      if (action.status !== STATUS_SUCCESS) {
        return state;
      }

      newState = Object.assign({}, state, {
        playlist: action.payload
      });
      return newState;
      
    case ACTION_SELECT_SONG:
      const {playlist} = state;
      newState = Object.assign({}, state, {
        current: Object.assign({}, playlist[0], {status: PLAYBACK_STATUS_PAUSED})
      });
      return newState;

    case ACTION_REQUEST_PLAY_SONG:
    case ACTION_PLAY_SONG:
      newState = Object.assign({}, state, {
        current: Object.assign({}, action.payload, {status: PLAYBACK_STATUS_PLAYING})
      });
      return newState;
    case ACTION_PAUSE_SONG:
      newState = Object.assign({}, state, {
        current: Object.assign({}, action.payload, {status: PLAYBACK_STATUS_PAUSED})
      });
      return newState;
    default:
      break;
  }
  
  return state;
}