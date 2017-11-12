import React from 'react';
import { render } from 'react-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'

import registerServiceWorker from './registerServiceWorker';

import startStream from './lib/Stream'
import {frameEvent} from './actions'

require('event-source-polyfill');

const middleware = [ thunk ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

startStream(store);

const frame = (time) => {
  store.dispatch(frameEvent(time));
  requestAnimationFrame(frame);
}

frame(0);


// const unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// )

render(<Provider store={store}>
          <App />
       </Provider>, document.getElementById('root'));
registerServiceWorker();
