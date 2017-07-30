import storage from 'electron-json-storage';

const taskStore = store => next => action => {
  const result = next(action);
  const tasks = store.getState().tasks;
  if (tasks !== store.tasks) {
    storage.set('tasks', tasks, (error) => { if (error) { console.log(error); } });
  }
  return result;
};

export default taskStore;
