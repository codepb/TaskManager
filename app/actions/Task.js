export const ADD_TASK = 'ADD_TASK';
export const CLEAR_TASKS = 'CLEAR_TASKS';

export function addTask(task: string) {
  return {
    type: ADD_TASK,
    task,
    id: CreateGuid()
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

  Id: string;
  Task: string;
}

let x = 1;
function CreateGuid(){
  return (x++).toString();
}
