import HomeView from './components/HomeView';
import reducer from './modules/playback';
import { injectReducer } from '../../store/reducers';

// Sync route definition
export default {
  component : HomeView
}


// 
// export default (store) => ({
//   path : '/',
//   /*  Async getComponent is only invoked when route matches   */
//   getComponent (nextState, cb) {
//     debugger;
//     injectReducer(store, { key: 'playback', reducer });
//     
//     cb(null, HomeView);
//   }
// })
