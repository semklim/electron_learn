const { ipcMain, BrowserWindow } = require('electron');
const { createWindow } = require('../defaultWindow');


ipcMain.on('createNewWindow', () => {
	const newWin = createWindow({ loadFile: './client/newWindow.html' });

	newWin.setBounds({ x: 50, y: newWin.id * 25 * 2 });
	newWin.webContents.send('img', `../assets/${Math.floor(Math.random() * 5) + 1}.jpg`);

	BrowserWindow.fromId(2).webContents.send('count', (newWin.id - 2));
	newWin.on('ready-to-show', () => {
		newWin.show();
	});
});

ipcMain.on('left-move', (event, arg) => {
	if (!arg) {
		return undefined;
	}
	const win = BrowserWindow.fromId(arg);
	const [x, y] = win.getPosition();
	win.setPosition(x - 50, y);

});

ipcMain.on('right-move', (event, arg) => {
	if (!arg) {
		return undefined;
	}
	const win = BrowserWindow.fromId(arg);
	const [x, y] = win.getPosition();
	win.setPosition(x + 50, y);

});

module.exports.ipcMain;