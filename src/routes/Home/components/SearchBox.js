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
        <a href="#" className="list-group-item" key={item.id}>{item.title}</a>
        )}
      </div>
    </div>
  </div>
);
