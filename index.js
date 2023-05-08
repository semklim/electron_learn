const { app } = require('electron');
const ipcMain = require('./IpcMain/ipcMainEvents');
const { createWindow } = require('./defaultWindow');
const { createTray } = require('./Tray/tray');
const { autoUpdater, AppUpdater } = require('electron-updater');
let mainWin;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const showMSGGUI = (chanel, ...msg) => {
  mainWin.webContents.send(chanel, msg);
};

app.whenReady().then(() => {
  setUpdaterListeners();
  mainWin = createWindow({
    loadFile: './client/Create.html',
    positionX: 950,
    positionY: 100,
  });

  mainWin.show();
  mainWin.webContents.send('update', 'Checking for update');
  mainWin.webContents.send('ver', app.getVersion());
  autoUpdater.checkForUpdates();


  createWindow({
    loadFile: './client/Move.html',
    positionX: 950,
    positionY: 500,
  }).show();
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


const setUpdaterListeners = () => {
  autoUpdater.on('update-available', (info) => {
    showMSGGUI('update-color-signal', 'update-available', info);
    autoUpdater.downloadUpdate();
  });

  autoUpdater.on('update-not-available', (info) => {
    showMSGGUI('update-color-signal', 'It`s latest version');
  });

  autoUpdater.on('update-downloaded', (info) => {
    const newVers = info.version;
    showMSGGUI('update', 'update-downloaded', info);

    setTimeout(() => { showMSGGUI('update', `Please restart app for updating to version ${newVers}`); }, 3000);
  });

  autoUpdater.on('error', (info) => {
    showMSGGUI('update', 'error', info);
  });
};