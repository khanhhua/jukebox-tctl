import React from 'react'
// We can `import` image as well
import './HomeView.scss';

import PlayButton from './PlayButton';

export const HomeView = () => (
  <div className="homeview">
    <div className="searchbox">
      <input className="form-control searchbox__query" placeholder="Search" />
    </div>
    
    <div className="playlist">
      <div className="playlist__item">
        <h4 className="title">Praise the LORD</h4>
      </div>
      <div className="playlist__item">
        <h4 className="title">Praise the LORD</h4>
      </div>
      <div className="playlist__item">
        <h4 className="title">Praise the LORD</h4>
      </div>
      <div className="playlist__item">
        <h4 className="title">Praise the LORD</h4>
      </div>
    </div>
    
    <div className="central-stage">
      <PlayButton style={{margin:'0 auto'}} />
      <div className="song-summary">
        <h3 className="title">Abraham's Praise</h3>
      </div>
    </div>
    
    <div className="lyricbox">
      <p>
        Risus explicabo cupiditate nunc tenetur qui asperiores amet penatibus
        repellendus labore quis
      </p>
      <p>
        Ea amet ornare congue, cupiditate parturient? Accusantium. Inceptos 
        temporibus reprehenderit sapien facilis, autem saepe! Nostra quam esse
        fugiat! Qui tincidunt vitae ante cupiditate laboris,
      </p>
      <p>
        eos! Dignissim aliquam porta sagittis corrupti, tortor ducimus nihil
        velit vehicula tellus? Laoreet ridiculus. Per luctus, libero viverra ultrices aute
      </p>
    </div>
    
    <div className="albums">
      <div className="albums__item">
        Traditional Hymns
      </div>
      <div className="albums__item">
        Traditional Hymns
      </div>
      <div className="albums__item">
        Traditional Hymns
      </div>
      <div className="albums__item">
        Traditional Hymns
      </div>
      <div className="albums__item">
        Traditional Hymns
      </div>
      <div className="albums__item">
        Traditional Hymns
      </div>
      <div className="albums__item">
        Traditional Hymns
      </div>
      <div className="albums__item">
        Traditional Hymns
      </div>
    </div>
  </div>
)

export default HomeView
