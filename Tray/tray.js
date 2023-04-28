
const { Tray, Menu } = require('electron');
const iconPng = './google_meet_icon.ico';
let tray = undefined;
// listener on click of trayMenu
const onTrayItemClick = (menuItem) => {
	console.log(menuItem.label);
};

function createTray () {
	if (typeof tray === 'undefined') {
		const trayContextMenu = Menu.buildFromTemplate([
			{ label: 'li', type: 'radio', checked: true },
			{ label: 'ui', type: 'checkbox' },
			{ label: 'ul', type: 'normal', click: onTrayItemClick },
		]);

		tray = new Tray(iconPng);

		tray.setContextMenu(trayContextMenu);
		return tray;
	}
	return tray;
}

module.exports = { createTray };