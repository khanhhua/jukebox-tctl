// ------------------------------------
// Constants
// ------------------------------------
const PLAYBACK_STATUS_UNLOADED = 'PLAYBACK_STATUS_UNLOADED';
const PLAYBACK_STATUS_LOADED = 'PLAYBACK_STATUS_LOADED';

const ACTION_LOAD_PLAYLIST = 'ACTION_LOAD_PLAYLIST';
const ACTION_LOAD_ALBUMS = 'ACTION_LOAD_ALBUMS';

// ------------------------------------
// Actions
// ------------------------------------


export const actions = {
  
};

const initialState = {
  current: {
    status: 'UNLOADED'
  },
  playlist: [
    {
      id: 'S01',
      title: 'Hallelujah to the Lamb'
    },
    {
      id: 'S02',
      title: 'Christian Soldiers'
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
  return state;
}