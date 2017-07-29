import uuidv4 from 'uuid/v4';

export const ADD_TASK = 'ADD_TASK';
export const START_TASK = 'START_TASK';
export const CLEAR_TASKS = 'CLEAR_TASKS';
export const STOP_TIMING = 'STOP_TIMING';

export function addTask(task: string) {
  return {
    type: ADD_TASK,
    task,
    id: CreateGuid(),
    Running: false,
    StartTime: null,
    TimeSpent: 0
  };
}

export function startTask(task: number) {
  return {
    type: START_TASK,
    task
  };
}

export function stopTiming() {
  return {
    type: STOP_TIMING
  };
}

export function clearTasks() {
  return {
    type: CLEAR_TASKS
  };
}

export class Task {
  constructor(init?: Partial<Task>) {
    Object.assign(this, init);
    if (typeof (this.TimeSpent) === 'undefined') {
      this.TimeSpent = 0;
    }
  }

  Id: string;
  Task: string;
  Running: boolean;
  StartTime: Date;
  TimeSpent: number;
}

function CreateGuid() {
  return uuidv4();
}
