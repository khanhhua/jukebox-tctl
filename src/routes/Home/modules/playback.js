// ------------------------------------
// Constants
// ------------------------------------
import * as db from 'lib/db';

export const PLAYBACK_STATUS_UNLOADED = 'UNLOADED';
export const PLAYBACK_STATUS_LOADED = 'LOADED';
export const PLAYBACK_STATUS_PLAYING = 'PLAYING';
export const PLAYBACK_STATUS_PAUSED = 'PAUSED';

const ACTION_SET_PLAYBACK_OPTIONS = 'ACTION_SET_PLAYBACK_OPTIONS';

const ACTION_LOAD_PLAYLIST = 'ACTION_LOAD_PLAYLIST';
const ACTION_LOAD_ALBUMS = 'ACTION_LOAD_ALBUMS';
const ACTION_ADD_TO_PLAYLIST = 'ACTION_ADD_TO_PLAYLIST';

const ACTION_SELECT_ALBUM = 'ACTION_SELECT_ALBUM';
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

function ensureAudioElement (dispatch, getState, song) {
  let audioElement;
  if (window.audioPlayer) {
    audioElement = window.audioPlayer;

    if (audioElement.currentSrc === song.mediaLink) {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.setAttribute('autoplay', true);
        audioElement.setAttribute('src', song.mediaLink);
      }
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
  
  audioElement.onended = function () {
    const {playback: 
      {
        current,
        playlist,
        options: {autoPlayNext}
      }
    } = getState();
    
    if (autoPlayNext) {
      const currentIndex = playlist.findIndex(item => item.id === current.id);
      
      if (currentIndex === playlist.length - 1) {
        console.info('Playlist is finished');
      } else {
        const song = playlist[currentIndex + 1];
        console.info('Playing next song in the list...');
        
        dispatch({
          type: ACTION_REQUEST_PLAY_SONG,
          payload: song
        });
        
        ensureAudioElement(dispatch, getState, song);
      }
    }
  }
}

export const actions = {
  setPlaybackOption: (optionKey, value) => ({
    type: ACTION_SET_PLAYBACK_OPTIONS,
    payload: {
      [optionKey]: value
    }
  }),
  loadAlbums: () => (dispatch, getState) => {
    dispatch({
      type: ACTION_LOAD_PLAYLIST,
      status: STATUS_PENDING
    });

    db.getAlbums().then(data => {
      if (!(data.length)) {
        dispatch({
          type: ACTION_LOAD_ALBUMS,
          status: STATUS_ERROR,
          payload: 'No albums available'
        });
        return;
      }

      const defaultAlbum = data.find(item => item.id === 'album-tctlvn');
      if (!(defaultAlbum && defaultAlbum.songs && defaultAlbum.songs.length)) {
        return;
      }

      defaultAlbum.selected = true;
      dispatch({
        type: ACTION_LOAD_ALBUMS,
        status: STATUS_SUCCESS,
        payload: data
      });

      db.getSongsByIds(defaultAlbum.songs).then(songs => {
        dispatch({
          type: ACTION_LOAD_PLAYLIST,
          status: STATUS_SUCCESS,
          payload: songs
        });
      });
    })
  },
  selectAlbum: (albumId) => (dispatch, getState) => {
    dispatch({
      type: ACTION_SELECT_ALBUM,
      payload: albumId
    });

    if (albumId === 'CUSTOM_PLAYLIST') {
      const {playback: {customPlaylist}} = getState();
      db.getSongsByIds(customPlaylist).then(songs => {
        dispatch({
          type: ACTION_LOAD_PLAYLIST,
          status: STATUS_SUCCESS,
          payload: songs
        });

        dispatch({
          type: ACTION_SELECT_SONG,
          payload: 'DEFAULT'
        });

        let {playback: {current: song}} = getState();

        ensureAudioElement(dispatch, getState, song);
      });
    } else {
      const {playback: {albums}} = getState();
      const defaultAlbum = albums.find(item => item.selected);

      db.getSongsByIds(defaultAlbum.songs).then(songs => {
        dispatch({
          type: ACTION_LOAD_PLAYLIST,
          status: STATUS_SUCCESS,
          payload: songs
        });

        dispatch({
          type: ACTION_SELECT_SONG,
          payload: 'DEFAULT'
        });

        let {playback: {current: song}} = getState();

        ensureAudioElement(dispatch, getState, song);
      });
    }
  },
  selectFirstSong: () => (dispatch, getState) => {
    dispatch({
      type: ACTION_SELECT_SONG,
      payload: 'DEFAULT'
    });

    setTimeout(() => {
      let {playback: {current: song}} = getState();

      ensureAudioElement(dispatch, getState, song);
    }, 300);
  },
  play: (song) => (dispatch) => {
    dispatch({
      type: ACTION_REQUEST_PLAY_SONG,
      payload: song
    });

    ensureAudioElement(dispatch, getState, song);
  },
  pause: () => {
    if (window.audioPlayer) {
      window.audioPlayer.pause();
    }

    return {
      type: ACTION_REQUEST_PAUSE_SONG,
    };
  },
  addSongToCustomPlaylist: (songId) => ({
    type: ACTION_ADD_TO_PLAYLIST,
    payload: songId
  })
};

const initialState = {
  current: {
    status: 'UNLOADED'
  },
  playlist: [],
  albums: [],
  customPlaylist: [],
  options: {
    autoPlayNext: true
  }
};

export default function playbackReducer (state = initialState, action) {
  let newState;

  switch (action.type) {
    case '@@redux/init':
      return state;
      
    case ACTION_SET_PLAYBACK_OPTIONS:
      newState = Object.assign({}, state, {
        options: Object.assign({}, state.options, action.payload)
      });
    
      return newState;
    case ACTION_LOAD_ALBUMS:
      if (action.status !== STATUS_SUCCESS) {
        return state;
      }

      newState = Object.assign({}, state, {
        albums: action.payload
      });
      return newState;

    case ACTION_SELECT_ALBUM:
      const prevSelectedAlbumIndex = state.albums.findIndex(item => item.selected);
      const albumIndex = state.albums.findIndex(item => item.id === action.payload);
      const albums = Object.assign([], state.albums);

      if (albumIndex !== -1) {
        albums[albumIndex] = Object.assign({}, albums[albumIndex], { selected: true });
      }
      if (prevSelectedAlbumIndex !== -1) {
        albums[prevSelectedAlbumIndex] = Object.assign({}, albums[prevSelectedAlbumIndex], { selected: false });
      }

      newState = Object.assign({}, state, {
        albums: albums
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

    case ACTION_ADD_TO_PLAYLIST:
      const {customPlaylist} = state;
      newState = Object.assign({}, state, {
        customPlaylist: Object.assign([], customPlaylist.concat(action.payload))
      });
      return newState;

    default:
      break;
  }

  return state;
}
