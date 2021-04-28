import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from './mobx/helpers/create-store';
import { StoreProvider } from './mobx/helpers/store-context';

/** Styles */
import './index.css';

/** Components */
import App from './App';

const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
