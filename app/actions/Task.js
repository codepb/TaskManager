export const ADD_TASK = 'ADD_TASK';
export const CLEAR_TASKS = 'CLEAR_TASKS';

export function addTask(task: string) {
  return {
    type: ADD_TASK,
    task: task
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
  }

  KeyBinding: number;
  Task: string;
}
