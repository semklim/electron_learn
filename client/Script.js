const { ipcRenderer } = require(`electron`);
const updateInfo = document.getElementById('updateInfo');

add.addEventListener('click', () => ipcRenderer.send('createNewWindow'));
updateInfo.textContent = "";
ipcRenderer.on('update', (event, arg) => {
  console.log(arg);
  if (typeof arg === 'string') {
    updateInfo.textContent = arg;
    return;
  }
  const rest = arg[1] && arg[1].version ? arg[1].version : '';
  updateInfo.textContent = arg[0] + ' ' + rest;
});

ipcRenderer.on('update-color-signal', (event, arg) => {
  if (typeof arg === 'string') {
    updateInfo.textContent = arg;
  } else {
    const rest = arg[1] ? arg[1].version : '';
    updateInfo.textContent = arg[0] + ' ' + rest;
  }
  updateInfo.setAttribute('style', `
  background-color: #4caf50;
  color: white;
  padding: 5px;
  border-radius: 5px;
  display: inline-block;
  `);
});

ipcRenderer.on('ver', (event, arg) => {
  versionInfo.textContent = 'Version ' + arg;
  console.log(arg);
});
