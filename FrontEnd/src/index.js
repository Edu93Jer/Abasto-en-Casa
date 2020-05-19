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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
