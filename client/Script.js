const { ipcRenderer } = require(`electron`);
const updateInfo = document.getElementById('updateInfo');
add.addEventListener('click', () => ipcRenderer.send('createNewWindow'));
updateInfo.textContent = "";
ipcRenderer.on('update', (event, ...arg) => {
	updateInfo.textContent = arg;
	console.log(arg);
});

ipcRenderer.on('ver', (event, arg) => {
	versionInfo.textContent = 'Version ' + arg;
	console.log(arg);
});
