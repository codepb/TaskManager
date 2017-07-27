// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import tasks from './Task';

const rootReducer = combineReducers({
  tasks,
  router,
});

export default rootReducer;
