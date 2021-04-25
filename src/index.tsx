import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

/** Styles */
import './index.css';

/** Components */
import App from './App';

/** Store */
import { store } from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
