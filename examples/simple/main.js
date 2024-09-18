const { app, BrowserWindow } = require('electron');
const path = require('node:path');

const { createNotification, setContainerWidth, setGlobalStyles } = require('notify-electron');

const createWindow = async () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // Open the DevTools.
  win.webContents.openDevTools();

  await win.loadFile('index.html');
};

app.whenReady().then(async () => {
  await createWindow();

  setContainerWidth(350);

  setGlobalStyles(`
    * {
      font-family: Helvetica;
    }
    .notification {
      display: block;
      padding: 20px;
      background: rgba(0, 0, 0, 0.75); /* Black with transparency */
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); /* Optional: shadow effect */
      backdrop-filter: blur(10px); /* Blurring the background */
      -webkit-backdrop-filter: blur(10px); /* Support for Safari */
      color: white; /* Text color */
      border-radius: 8px;
      margin: 4px;
    }
    .notification h1 {
      font-weight: bold;
    }
  `);

  const myTitleVar = 'Notification title';
  const myBodyVar = 'Notification body';
  const notification = createNotification({
    content: `
      <div class="notification">
        <h1>${myTitleVar}</h1>
        <p>${myBodyVar}</p>
      </div>
    `,

    // OPTIONAL: Specify a timeout.
    timeout: 3000000,
  });

  // When the notification was clicked.
  notification.on("click", () => {
    console.log("Notification has been clicked");
  });

  // When the notification was closed.
  notification.on("close", () => {
    console.log("Notification has been closed");
  });

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) await createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
