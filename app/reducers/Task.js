// @flow
import { ADD_TASK, CLEAR_TASKS, START_TASK, Task } from '../actions/Task';

export type taskStateType = {
  +tasks: string[]
};

type actionType = {
  +type: string
};

type addTaskActionType = actionType & {
  +task: string,
  +id: string
};

type allowedActionTypes = actionType | addTaskActionType;

export default function task(state: Task[] = [], action: allowedActionTypes) {
  switch (action.type) {
    case ADD_TASK:
      return [...state, new Task({ id: action.id, task: action.task })];
    case START_TASK:
      return startTask(state, action.task);
    case CLEAR_TASKS:
      return [];
    default:
      return state;
  }
}

function startTask(state: Task[], taskNumber: number): Task[] {
  const taskToUpdate = state[taskNumber - 1];
  if (typeof (taskToUpdate) !== 'undefined') {
    let newState = [...state];
    const now = new Date();
    newState = newState.map(x => {
      const toReturn = new Task(x);
      if (toReturn.Running) {
        toReturn.TimeSpent += (now - toReturn.StartTime) / 1000;
      }
      toReturn.Running = false;
      toReturn.StartTime = null;
      return toReturn;
    });
    const newTask = new Task(taskToUpdate);
    newTask.Running = true;
    newTask.StartTime = now;
    newState[taskNumber - 1] = newTask;
    return newState;
  }
  return state;
}
