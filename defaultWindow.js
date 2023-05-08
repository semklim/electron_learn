const { BrowserWindow } = require("electron");

function createWindow ({ loadFile, positionX, positionY, width, height }) {
  const win = new BrowserWindow({
    width: (width || 450),
    height: (height || 300),
    show: false,
    webPreferences: {
      // node packages is available in index.html
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
    frame: false,
    // resizable: false,
    alwaysOnTop: true
  });
  if (typeof loadFile === 'string') {
    win.loadFile(loadFile);
  }
  if (positionX && positionY) {
    win.setBounds({ x: positionX, y: positionY });
  }
  return win;
};

module.exports = { createWindow };