import React from 'react';

import './SearchBox.scss';

export default ({query='', songs=[], actions}) => (
  <div className="searchbox">
    <input className="form-control searchbox__query"
        placeholder="Search"
        value={query}
        onChange={(e) => {
          actions.searchByTitle(e.target.value);
        }} />
    <div className="searchbox__dropdown">
      <div className="list-group">
        {songs.map(item =>
        <div className="list-group-item" key={item.id}>
          {item.title}
          &nbsp;
          <a className="btn btn-link add" href="#"
              onClick={() => actions.addSongToCustomPlaylist(item.id)}>
              <i className="fa fa-plus"></i>
          </a>
        </div>
        )}
      </div>
    </div>
  </div>
);
