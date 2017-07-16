import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// We can `import` image as well
import './HomeView.scss';
import {actions} from '../modules/playback';

import PlayButton from './PlayButton';

const HomeView = ({current, playlist, albums, actions}) => (
  <div className="homeview">
    <div className="searchbox">
      <input className="form-control searchbox__query" placeholder="Search" />
    </div>
    
    <div className="playlist">
      {playlist.map(({id, title, mediaLink}) => 
      <div className={'playlist__item' + (current.id===id?' active':'')}
           onClick={() => actions.play({id, title, mediaLink})}
           key={id}>
        <h4 className="title">{title}</h4>
      </div>
      )}
    </div>
    
    <div className="central-stage">
      <PlayButton style={{margin:'0 auto'}} song={current} actions={actions} />
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
      {/* PREV BUTTON */}
      {albums.slice(0,7).map(({id, title, selected}) => (
      <div className={'albums__item ' + (selected?'active':'')}
           onClick={() => actions.selectAlbum(id)}
           key={id}>
        {title}
      </div>  
      ))}
      <div className="albums__item">
        ...
      </div>
      {/* NEXT BUTTON */}
    </div>
  </div>
)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

const mapStateToProps = (state) => {
  const {current, playlist, albums} = state.playback;
  
  return {current, playlist, albums};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
