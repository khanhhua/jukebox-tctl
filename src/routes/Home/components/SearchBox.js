import React from 'react';

import './SearchBox.scss';

export default ({query='', songs=[], customPlaylist, ui, actions}) => (
  <div className="searchbox">
    <input className="form-control searchbox__query"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          actions.searchByTitle(e.target.value);
        }} />
    {ui.searching &&
    <div className="searchbox__overlay" onClick={() => actions.stopSearching()}>&nbsp;</div>
    }
    {ui.searching &&
    <div className="searchbox__dropdown">
      <div className="list-group">
        {songs.map(item =>
        <div className="list-group-item" key={item.id}>
          {item.title}
          &nbsp;
          {(customPlaylist.findIndex(playlistItem => playlistItem === item.id) === -1)?
          <a className="btn btn-link add" href="#"
              onClick={() => actions.addSongToCustomPlaylist(item.id)}>
              <i className="fa fa-plus"></i>
          </a>
          :
          <span className="btn btn-link text-muted">Now in my playlist</span>
          }
        </div>
        )}
      </div>
    </div>
    }
  </div>
);
