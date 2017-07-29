// @flow
import { ADD_TASK, CLEAR_TASKS, START_TASK, STOP_TIMING, Task } from '../actions/Task';

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
      if (state.length === 9) {
        return state;
      }
      return [...state, new Task({ id: action.id, task: action.task })];
    case START_TASK:
      return startTask(state, action.task);
    case STOP_TIMING:
      return stopTiming(state);
    case CLEAR_TASKS:
      return [];
    default:
      return state;
  }
}

function startTask(state: Task[], taskNumber: number): Task[] {
  const taskToUpdate = state[taskNumber - 1];

  if (typeof (taskToUpdate) !== 'undefined') {
    if (taskToUpdate.Running) {
      return state;
    }
    let newState = [...state];
    const now = new Date();
    newState = stopRunningTasks(newState);
    const newTask = new Task(taskToUpdate);
    newTask.Running = true;
    newTask.StartTime = now;
    newState[taskNumber - 1] = newTask;
    return newState;
  }
  return state;
}

function stopTiming(state: Task[]) {
  const newState = [...state];
  return stopRunningTasks(newState);
}

function stopRunningTasks(newState: Task[]) {
  const now = new Date();
  return newState.map(x => {
    const toReturn = new Task(x);
    if (toReturn.Running) {
      toReturn.TimeSpent += (now - toReturn.StartTime) / 1000;
    }
    toReturn.Running = false;
    toReturn.StartTime = null;
    return toReturn;
  });
}
