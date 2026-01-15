const { app, BrowserWindow } = require("electron");

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      contextIsolation: false
    }
  });

  win.loadFile("public/index.html");
}

app.whenReady().then(createWindow);