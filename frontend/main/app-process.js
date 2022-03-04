const {BrowserWindow} = require('electron');

function createAppWindow() {
  let win = new BrowserWindow({
    width: 1000,
    height: 600,
    autoHideMenuBar:true,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });
  win.maximize();  //window will take it's maximum size
  win.loadFile('./renderers/home.html');

  win.on('closed', () => {
    win = null;
  });
}

module.exports = createAppWindow;
