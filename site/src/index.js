import React from 'react';
import { render } from 'react-dom';
import './index.css';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import App from './containers/App'

import registerServiceWorker from './registerServiceWorker';

const middleware = [ thunk ];

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(<Provider store={store}>
          <App />
       </Provider>, document.getElementById('root'));
registerServiceWorker();
