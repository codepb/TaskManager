// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import type { taskStateType } from '../reducers/Task';
import taskStore from '../middleware/taskStore';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router, taskStore);

function configureStore(initialState?: taskStateType) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };
