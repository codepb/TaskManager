/* eslint global-require: 1, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow, Tray, dialog } from 'electron';
import Server from 'electron-rpc/server';
import path from 'path';
import MenuBuilder from './menu';
import ShortcutRegister from './shortcuts';

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const server = new Server();

let tray = null;

const createTray = () => {
  tray = new Tray(path.join(__dirname, 'resources', 'icon.png'));
  tray.on('click', () => {
    toggleWindow();
  });
  tray.setToolTip('Time Manager');
};

const toggleWindow = () => {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
}

const showWindow = () => {
  mainWindow.show();
  mainWindow.focus();
}


const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  createTray();

  mainWindow = new BrowserWindow({
    show: false,
    width: 240,
    height: 300,
    skipTaskbar: true,
    frame: false,
    resizable: false,
    transparent: true,
    webPreferences: {
      experimentalFeatures: true
    }
  });

  mainWindow.on('blur', () => {
    if (!mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.hide();
    }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);
  mainWindow.hide();

  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow, tray);
  menuBuilder.buildTrayMenu();
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    menuBuilder.setupDevelopmentEnvironment();
  }

  server.configure(mainWindow.webContents);

  mainWindow.on('focus', () => {
    server.send('applicationFocussed');
  });

  const shortcutRegister = new ShortcutRegister(mainWindow, server);
  shortcutRegister.setupGlobalShortcuts(toggleWindow);
  shortcutRegister.setupLocalShortcuts();
});
