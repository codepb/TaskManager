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

const allowedKeyBindings = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function task(state: Task[] = [], action: allowedActionTypes) {
  switch (action.type) {
    case ADD_TASK:
      var keyBinding = allowedKeyBindings.filter(i => !state.map(s => s.keyBinding).includes(i))[0]
      if(typeof keyBinding !== "undefined"){
        return [...state, new Task({ keyBinding: keyBinding, task: action.task })];
      }
      return state;
    case CLEAR_TASKS:
      return [];
    default:
      return state;
  }
}
