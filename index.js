const { app } = require('electron');
const ipcMain = require('./IpcMain/ipcMainEvents');
const { createWindow } = require('./defaultWindow');
const { createTray } = require('./Tray/tray');
const { autoUpdater } = require('electron-updater');
let mainWin;

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.on('update-available', () => {
	autoUpdater.downloadUpdate();
});

autoUpdater.on('update-downloaded', () => {
	autoUpdater.quitAndInstall();
});


app.whenReady().then(() => {
	setUpdaterListeners();
	mainWin = createWindow({
		loadFile: './client/Create.html',
		positionX: 950,
		positionY: 200,
	});
	mainWin.show();
	mainWin.webContents.send('update', 'Checking for update'); //Раз передає повідомлення, раз не передає. Не можу знайти причину такої поведінки. Підскажіть, що я не так роблю.
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


const sendMsg = (chanel, ...msg) => {
	mainWin.webContents.send(chanel, msg);
};

function setUpdaterListeners () {
	autoUpdater.on('update-available', (info) => {
		sendMsg('update', 'update-available', info);
	});
	autoUpdater.on('update-not-available', (info) => {
		sendMsg('update', 'update-not-available', info);
	});
	autoUpdater.on('update-downloaded', (info) => {
		sendMsg('update', 'update-downloaded', info);
	});
	autoUpdater.on('error', (info) => {
		sendMsg('update', 'error', info);
	});
};