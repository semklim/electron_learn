const { autoUpdater } = require('electron-updater');
const mainWin = require('..');

autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

autoUpdater.on('update-available', () => {
	autoUpdater.downloadUpdate();
});

autoUpdater.on('update-downloaded', () => {
	autoUpdater.quitAndInstall();
});


const sendMsg = (chanel, ...msg) => {
	mainWin.webContents.send(chanel, msg);
};

const setUpdaterListeners = () => {
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

module.exports = { setUpdaterListeners, autoUpdater };