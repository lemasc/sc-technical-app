const { initRemix } = require("remix-electron");
const { app, BrowserWindow, dialog, shell } = require("electron");
const path = require("node:path");

/** @type {BrowserWindow | undefined} */
let win;

/** @param {string} url */
async function createWindow(url) {
  win = new BrowserWindow({
    show: false,
    width: 600,
    height: 800,
    resizable: false,
    autoHideMenuBar: true,
  });
  win.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
  await win.loadURL(`${url}photo`);
  win.show();

  if (process.env.NODE_ENV === "development") {
    //win.webContents.openDevTools();
  }
}

app.on("ready", () => {
  void (async () => {
    try {
      if (process.env.NODE_ENV === "development") {
        const {
          default: installExtension,
          REACT_DEVELOPER_TOOLS,
        } = require("electron-devtools-installer");

        await installExtension(REACT_DEVELOPER_TOOLS);
      }

      const url = await initRemix({
        serverBuild: path.join(__dirname, "../build/index.js"),
      });
      await createWindow(url);
    } catch (error) {
      dialog.showErrorBox("Error", getErrorStack(error));
      console.error(error);
    }
  })();
});

/** @param {unknown} error */
function getErrorStack(error) {
  return error instanceof Error ? error.stack || error.message : String(error);
}
