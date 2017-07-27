// @flow
import { app, BrowserWindow, globalShortcut } from 'electron';

export default class GlobalShortcutRegister {
  mainWindow: BrowserWindow;

  constructor(mainWindow: BrowserWindow) {
    this.mainWindow = mainWindow;
  }

  setupGlobalShortcuts() {
    const ret = globalShortcut.register('CommandOrControl+Shift+0', () => {
      this.mainWindow.show();
      this.mainWindow.focus();
    });

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
}
