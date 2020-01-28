console.log("main.js\\");
console.log(`process.pid ${process.pid}
__filename ${__filename}
__dirname  ${__dirname}`);

//node
const requirePath = require("path");

//electron
const requireElectron = require("electron");
const app           = requireElectron.app;
const BrowserWindow = requireElectron.BrowserWindow;
const Menu          = requireElectron.Menu
const protocol      = requireElectron.protocol;
const ipcMain       = requireElectron.ipcMain;

//random
const requireElectronLog = require("electron-log");//34k weekly downloads, probably good, what are we using right now?

//custom
const requireLibrary = require("./library.js");
const whisper          = requireLibrary.whisper;
const addWhisperLogger = requireLibrary.addWhisperLogger;

whisper("hi from main.js");





let autoUpdater;
enableUpdater();
function enableUpdater() {

	const requireElectronUpdater = require("electron-updater");
	autoUpdater = requireElectronUpdater.autoUpdater;

	autoUpdater.logger = requireElectronLog;//tell electron-updater to use electron-log
	autoUpdater.logger.transports.file.level = "info";//and set it to report "info" level logs and more severe

	autoUpdater.on('checking-for-update',  ()                => { whisper('Checking for update...');                       });
	autoUpdater.on('update-available',     (ev, info)        => { whisper('Update available.');                            });
	autoUpdater.on('update-not-available', (ev, info)        => { whisper('Update not available.');                        });
	autoUpdater.on('error',                (ev, err)         => { whisper('Error in auto-updater.');                       });
	autoUpdater.on('download-progress',    (ev, progressObj) => { whisper('Download progress...');                         });
	autoUpdater.on('update-downloaded',    (ev, info)        => { whisper('Update downloaded; will install in 5 seconds'); });

	// For details about these events, see the Wiki:
	// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
	// The app doesn't need to listen to any events except `update-downloaded`
	autoUpdater.on('update-downloaded', (ev, info) => {
		// Wait 5 seconds, then quit and install
		// You could call autoUpdater.quitAndInstall(); immediately
		setTimeout(function() {
			autoUpdater.quitAndInstall();  
		}, 5000)
	})

	app.on('ready', function()  {
		whisper("this is app version " + app.getVersion());
		autoUpdater.checkForUpdates();
	});
}



let window1;

function createDefaultWindow() {
	window1 = new BrowserWindow({
		width: 1000,
		height: 1000,
		webPreferences: {
			nodeIntegration: true,
			preload: requirePath.join(__dirname, "window.js")
		}
	});
	window1.webContents.openDevTools();
	window1.on("closed", function() { window1 = null; });
	window1.loadURL(`file://${__dirname}/index.html`);


	window1.webContents.once("dom-ready", function() {
		whisper("WHICHFIRST? dom-ready");
		addWhisperLogger(function (s) {
			window1.webContents.send("message", s);
		});
	});
}





let template = [];
if (process.platform == "darwin") {
	const name = app.getName();
	template.unshift({
		label: name,
		submenu: [
			{ label: 'About ' + name, role: 'about' },
			{ label: 'Quit', accelerator: 'Command+Q', click() { app.quit(); } },
		]
	})
}

app.on("ready", function() {

	// Create the Menu
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);












	createDefaultWindow();
});
app.on("window-all-closed", () => {
	app.quit();//quit on all platforms
});










console.log("main.js/");
