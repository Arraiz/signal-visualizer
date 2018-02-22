const {
  app,
  BrowserWindow
} = require('electron')
const path = require('path')
const url = require('url')
locals = null;
const ipcMain = require('electron').ipcMain;
require('electron-reload')(__dirname);

//TD:LR
//opciones diferentes para tiempo o frecuencia 
//comentar librerias fft
//considerar sliders



// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let plotWin;

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, '/index/index.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

function createPlotWindow(data) {
  plotWin = new BrowserWindow({
    width: 800,
    height: 600
  });
  plotWin.loadURL(url.format({
    pathname: path.join(__dirname, '/plot/plotwin.html'),
    protocol: 'file:',
    slashes: true,
  }));

  // Open the DevTools.
  plotWin.webContents.openDevTools()
  //enviamos la data una vez esta cargado el dom
  plotWin.webContents.once('dom-ready', () => {
    plotWin.webContents.send('input-received', data)
})
  // Emitted when the window is closed.
  plotWin.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    plotWin = null
  })

}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})


ipcMain.on('c1', function (event, args) {
  //open new plot  window
  createPlotWindow(args);

  
  
  //continuar desde aqui

})
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.