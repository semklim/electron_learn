const { app } = require('electron');
const ipcMain = require('./IpcMain/ipcMainEvents');
const { createWindow } = require('./defaultWindow');
const { createTray } = require('./Tray/tray');

app.whenReady().then(() => {
	try {
		createWindow({
			loadFile: './client/Create.html',
			positionX: 950,
			positionY: 200,
		})
			.show();

		createWindow({
			loadFile: './client/Move.html',
			positionX: 950,
			positionY: 500,
		})
			.show();

		createTray();
	} catch (err) {
		console.log(err);
	}
});


app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});