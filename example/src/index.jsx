import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import {
  AppProvider,
  ErrorPage,
  PageRoute,
} from '@edx/frontend-platform/react';
import { APP_INIT_ERROR, APP_READY, initialize } from '@edx/frontend-platform';
import { subscribe } from '@edx/frontend-platform/pubSub';
import { messages as paragonMessages } from '@edx/paragon';
import MyComponent from './MyComponent';

import './index.scss';
import '../../paragon/build/variables.css';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider>
      <PageRoute
        exact
        path="/"
        component={MyComponent}
      />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    paragonMessages,
  ],
  requireAuthenticatedUser: false,
  hydrateAuthenticatedUser: true,
});
