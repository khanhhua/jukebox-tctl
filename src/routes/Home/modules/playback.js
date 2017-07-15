// ------------------------------------
// Constants
// ------------------------------------
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
  playlist: [
    {
      id: 'S01',
      title: 'Hoi Thanh Vuong, Kip Ngu Lai',
      mediaLink: 'http://www.thanhcatinlanh.com/media/thanhca/02001/mp3s/02001-s.mp3'
    },
    {
      id: 'S02',
      title: 'Nguyen Tung My Chua Linh Nang',
      mediaLink: 'http://www.thanhcatinlanh.com/media/tcvn/002/002-s1.mp3'
    },
    {
      id: 'S03',
      title: 'Ngoi Giehova Thanh De',
      mediaLink: 'http://www.thanhcatinlanh.com/media/tcvn/003/003-c1.mp3'
    }
  ],
  albums: [
    {
      id: 'A01',
      title: 'Traditional Hymns'
    },
    {
      id: 'A02',
      title: 'Praise and Worship'
    },
    {
      id: 'A03',
      title: 'Tôn Vinh Chúa Hằng Hữu'
    },
    {
      id: 'A04',
      title: 'Traditional Hymns'
    },
    {
      id: 'A05',
      title: 'Praise and Worship'
    },
    {
      id: 'A06',
      title: 'Tôn Vinh Chúa Hằng Hữu'
    },
    {
      id: 'A07',
      title: 'Praise and Worship'
    },
    {
      id: 'A08',
      title: 'Praise and Worship'
    },
    {
      id: 'A09',
      title: 'Tôn Vinh Chúa Hằng Hữu'
    },
    {
      id: 'A10',
      title: 'Praise and Worship'
    },
  ]
};

export default function playbackReducer (state = initialState, action) {
  let newState;
  
  switch (action.type) {
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