// @flow
import { ADD_TASK, CLEAR_TASKS, Task } from '../actions/Task';

export type taskStateType = {
  +tasks: string[]
};

type actionType = {
  +type: string
};

type addTaskActionType = actionType & {
  +task: task
};

type allowedActionTypes = actionType | addTaskActionType;

export default function task(state: string[] = [], action: allowedActionTypes) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, new Task({ keyBinding: 1, task: action.task })];
    case CLEAR_TASKS:
      return [];
    default:
      return state;
  }
}
