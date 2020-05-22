import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';
import * as serviceWorker from './serviceWorker';
import { ContextProvider } from './context/context';

import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
  <ContextProvider>
    <AppRouter />
  </ContextProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
