// @flow
import { app, BrowserWindow, globalShortcut, dialog } from 'electron';
import electronLocalshortcut from 'electron-localshortcut';
import Server from 'electron-rpc/server';

export default class ShortcutRegister {
  mainWindow: BrowserWindow;
  server: Server;

  constructor(mainWindow: BrowserWindow, server: Server) {
    this.mainWindow = mainWindow;
    this.server = server;
  }

  setupGlobalShortcuts(func: Function) {
    const ret = globalShortcut.register('CommandOrControl+Shift+0', func);

    if (!ret) {
      console.log('registration failed');
    }

    // Check whether a shortcut is registered.
    console.log(globalShortcut.isRegistered('CommandOrControl+Shift+0'));

    app.on('will-quit', () => {
      // Unregister all shortcuts.
      globalShortcut.unregisterAll();
    });
  }

  setupLocalShortcuts() {
    electronLocalshortcut.register('CommandOrControl+0', () => {
      this.server.send('stopTiming', 0);
    });
    electronLocalshortcut.register('CommandOrControl+1', () => {
      this.server.send('taskTriggered', 1);
    });
    electronLocalshortcut.register('CommandOrControl+2', () => {
      this.server.send('taskTriggered', 2);
    });
    electronLocalshortcut.register('CommandOrControl+3', () => {
      this.server.send('taskTriggered', 3);
    });
    electronLocalshortcut.register('CommandOrControl+4', () => {
      this.server.send('taskTriggered', 4);
    });
    electronLocalshortcut.register('CommandOrControl+5', () => {
      this.server.send('taskTriggered', 5);
    });
    electronLocalshortcut.register('CommandOrControl+6', () => {
      this.server.send('taskTriggered', 6);
    });
    electronLocalshortcut.register('CommandOrControl+7', () => {
      this.server.send('taskTriggered', 7);
    });
    electronLocalshortcut.register('CommandOrControl+8', () => {
      this.server.send('taskTriggered', 8);
    });
    electronLocalshortcut.register('CommandOrControl+9', () => {
      this.server.send('taskTriggered', 9);
    });
    electronLocalshortcut.register('CommandOrControl+Shift+F4', () => {
      const choice = dialog.showMessageBox(this.mainWindow, {
        type: 'question',
        buttons: ['Yes', 'Cancel'],
        title: 'Confirm',
        message: 'Are you sure you want to clear all tasks?'
      });
      if (choice === 0) {
        this.server.send('clearTasks');
      }
    });
  }
}
