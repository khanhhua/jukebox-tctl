import React from 'react';
import './PlayButton.scss';

import {
  PLAYBACK_STATUS_UNLOADED,
  PLAYBACK_STATUS_LOADED,
  PLAYBACK_STATUS_PLAYING } from '../modules/playback';

function onClick({selectFirstSong, play, pause}, song) {
  if (song.status === PLAYBACK_STATUS_UNLOADED) {
    selectFirstSong();
  } else {
    if (song.status === PLAYBACK_STATUS_PLAYING) {
      pause();
    }
    else {
      play(song);
    }
  }
}

const PlayButton = ({style, song, actions}) => (
  <div>
    <div className="play-button" style={style} onClick={onClick.bind(this, actions, song)}>
      {(song && song.status !== 'PLAYING') &&
      <span>PLAY</span>
      }
      {(song && song.status === 'PLAYING') &&
      <span>PAUSE</span>
      }
    </div>
    {(song.status !== PLAYBACK_STATUS_UNLOADED) &&
    <div className="song-summary">
      <h3>{song.title}</h3>
      
    </div>
    }
    
  </div>
);


export default PlayButton;