import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './app/styles/index.css';
import {Provider} from 'react-redux';

import {App} from './app/App.tsx';
import {store} from './app/store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
