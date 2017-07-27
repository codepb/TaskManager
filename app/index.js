import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Client from 'electron-rpc/client';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import { startTask } from './actions/Task';

// Initialize rpc communication
const client = new Client();

const store = configureStore();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

client.on('taskTriggered', (err, body: number) => {
  // global listener for ipc event sent from main process
  const action = startTask(body);
  store.dispatch(action);
});

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
