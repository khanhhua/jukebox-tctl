import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// We can `import` image as well
import './HomeView.scss';
import {actions} from '../modules/playback';
import {actions as searchActions} from '../modules/search';

import PlayButton from './PlayButton';
import SearchBox from './SearchBox';

const HomeView = ({current, playlist, customPlaylist, albums, search, options, actions, ui}) => (
  <div className="homeview">
    <SearchBox query={search.query}
               songs={search.songs}
               customPlaylist={customPlaylist}
               actions={actions} ui={ui} />

    <div className="playlist">
      <div className="playlist__scrollpane">
        {playlist.map(({id, title, mediaLink, lyric}) =>
        <div className={'playlist__item' + (current.id===id?' active':'')}
             onClick={() => actions.play({id, title, mediaLink, lyric})}
             key={id}>
          <h4 className="title">{title}</h4>
        </div>
        )}
      </div>
    </div>

    <div className="central-stage">
      <span className="switch-button">
        <input id="autoPlayNext" type="checkbox" checked={options.autoPlayNext}
               onChange={(e) => actions.setPlaybackOption('autoPlayNext', !options.autoPlayNext) } />
        <label htmlFor="autoPlayNext" className="control-label">Auto play next</label>
      </span>

      <PlayButton style={{margin:'0 auto'}} song={current} actions={actions} />
    </div>

    {current.lyric &&
    <div className="lyricbox">
      {current.lyric}
    </div>
    }

    <div className="albums">
      {/* PREV BUTTON */}
      {albums.slice(0,7).map(({id, title, selected}) => (
      <div className={'albums__item ' + (selected?'active':'')}
           onClick={() => actions.selectAlbum(id)}
           key={id}>
        {title}
      </div>
      ))}
      <div className="albums__item"
           onClick={() => actions.selectAlbum('CUSTOM_PLAYLIST')}>
        My Playlist
      </div>
      {/* NEXT BUTTON */}
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({...actions, ...searchActions}, dispatch)
});

const mapStateToProps = (state) => {
  const {current, playlist, customPlaylist, albums, options} = state.playback;
  const search = state.search;
  const ui = state.homeUi;

  return {current, playlist, customPlaylist, albums, options, search, ui};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
