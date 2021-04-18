const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup'))
{
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    //frame: false,
    icon: './src/App/Media/Images/logo.ico',
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.webContents.on('new-window', function(e, url) {
    e.preventDefault();
    require('electron').shell.openExternal(url);
  });
  mainWindow.setMenuBarVisibility(false);
  mainWindow.maximize();

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'app/gameWindow.html'));

  globalShortcut.register('ESC', function () {
    //app.quit();
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});