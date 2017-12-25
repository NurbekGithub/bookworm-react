import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import decode from 'jwt-decode';
import thunk from 'redux-thunk';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

import rootReducer from './rootReducer';
import { userLoggedIn } from './actions/auth';

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

if(localStorage.bookwormJWT) {
  const payload = decode(localStorage.bookwormJWT);
  const user = { 
    token: localStorage.bookwormJWT, 
    email: payload.email, confirmed: 
    payload.confirmed 
  };
  setAuthorizationHeader(localStorage.bookwormJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>, 
  document.getElementById('root')
);
registerServiceWorker();
