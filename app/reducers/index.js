// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tasks from './Task';
import smallMode from './smallMode';

const rootReducer = combineReducers({
  tasks,
  router,
  smallMode
});

export default rootReducer;
