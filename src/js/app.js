const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 560,
    height: 380,
    icon: path.join(__dirname, '..', '..', 'icon.ico'),
    resizable: false
  });

  win.setMenuBarVisibility(false);
  win.loadFile('src/pages/index.html');
};

app.whenReady().then(() => createWindow());
app.on('window-all-closed', () => app.quit());
