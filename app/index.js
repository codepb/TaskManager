import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Client from 'electron-rpc/client';
import storage from 'electron-json-storage';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import { startTask, stopTiming, clearTasks, Task } from './actions/Task';

// Initialize rpc communication
const client = new Client();

storage.get('tasks', (error, tasks) => {
  if (error) {
    console.log(error);
  } else {
    const initialState = { tasks };
    if (!Array.isArray(initialState.tasks)) {
      initialState.tasks = [];
    }
    initialState.tasks = initialState.tasks.map((item) => {
      const task = new Task(item);
      if (task.StartTime != null) {
        task.StartTime = new Date(task.StartTime);
      }
      return task;
    });
    const store = configureStore(initialState);
    render(
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );

    client.on('stopTiming', () => {
      // global listener for ipc event sent from main process
      const action = stopTiming();
      store.dispatch(action);
    });

    client.on('taskTriggered', (err, body: number) => {
      // global listener for ipc event sent from main process
      const action = startTask(body);
      store.dispatch(action);
    });

    client.on('clearTasks', () => {
      const action = clearTasks();
      store.dispatch(action);
    });

    client.on('toggleTheme', () => {
      const body = document.body;
      if (body.classList.contains('light')) {
        body.classList.remove('light');
      } else {
        body.classList.add('light');
      }
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
  }
});

