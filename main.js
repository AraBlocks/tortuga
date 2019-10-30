whisper("main.js start");

const requireElectron = require("electron");
const app           = requireElectron.app;
const BrowserWindow = requireElectron.BrowserWindow;
const Menu          = requireElectron.Menu
const protocol      = requireElectron.protocol;
const ipcMain       = requireElectron.ipcMain;

const requireElectronUpdater = require("electron-updater");
const autoUpdater            = requireElectronUpdater.autoUpdater;

const log = require("electron-log");//34k weekly downloads, probably good, what are we using right now?
autoUpdater.logger = log;//tell electron-updater to use electron-log
autoUpdater.logger.transports.file.level = "info";//and set it to report "info" level logs and more severe

//-------------------------------------------------------------------
// Define the menu
//
// THIS SECTION IS NOT REQUIRED
//-------------------------------------------------------------------
let template = []
if (process.platform === 'darwin') {
	// OS X
	const name = app.getName();
	template.unshift({
		label: name,
		submenu: [
			{
				label: 'About ' + name,
				role: 'about'
			},
			{
				label: 'Quit',
				accelerator: 'Command+Q',
				click() { app.quit(); }
			},
		]
	})
}

//-------------------------------------------------------------------
// Open a window that displays the version
//
// THIS SECTION IS NOT REQUIRED
//
// This isn't required for auto-updates to work, but it's easier
// for the app to show a window than to have to click "About" to see
// that updates are working.
//-------------------------------------------------------------------
let win;

function createDefaultWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 1000,
		webPreferences: {
			nodeIntegration: true
		}
	});
	win.webContents.openDevTools();
	win.on('closed', () => {
		win = null;
	});
	win.loadURL(`file://${__dirname}/index.html`);
	win.webContents.once("dom-ready", function() {
		addWhisperLogger(function (s) {
			win.webContents.send("message", s);
		});
	});

	return win;
}

autoUpdater.on('checking-for-update',  ()                => { whisper('Checking for update...');                       });
autoUpdater.on('update-available',     (ev, info)        => { whisper('Update available.');                            });
autoUpdater.on('update-not-available', (ev, info)        => { whisper('Update not available.');                        });
autoUpdater.on('error',                (ev, err)         => { whisper('Error in auto-updater.');                       });
autoUpdater.on('download-progress',    (ev, progressObj) => { whisper('Download progress...');                         });
autoUpdater.on('update-downloaded',    (ev, info)        => { whisper('Update downloaded; will install in 5 seconds'); });

app.on('ready', function() {
	// Create the Menu
	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	createDefaultWindow();
});
app.on('window-all-closed', () => {
	app.quit();
});

//-------------------------------------------------------------------
// Auto updates
//
// For details about these events, see the Wiki:
// https://github.com/electron-userland/electron-builder/wiki/Auto-Update#events
//
// The app doesn't need to listen to any events except `update-downloaded`
//-------------------------------------------------------------------
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







var _whisper;
function _whisperInit() { _whisper = {logs:[],loggers:[]} }
function addWhisperLogger(f) {
	if (!_whisper) _whisperInit();
	_whisper.logs.forEach(function(e) { f(e); });//get the new provider all caught up
	_whisper.loggers.push(f);//add the given new logger to our list of all of them
}

function whisper(s) {//log s to all our providers
	if (!_whisper) _whisperInit();
	const limit = 500;//don't cache a huge number of early logs in memory
	s = "["+composeWhisperPrefix()+"] "+s;
	if (_whisper.logs.length < limit) _whisper.logs.push(s);
	if (_whisper.logs.length == limit) _whisper.logs.push("Over limit, additional early logs omitted");
	_whisper.loggers.forEach(function(f) { f(s); });
}

setupWhisperToConsole();
function setupWhisperToConsole() {
	addWhisperLogger(function(s) { console.log(s); });
}

setupWhisperToFolder();
function setupWhisperToFolder() {
	const os = require("os");
	const fs = require("fs");
	var file;

	var folderPath = os.homedir() + "/whisper";//path to the whisper folder
	var fileName = "/"+composeWhisperPrefix()+".txt";
	fs.stat(folderPath, function(err, stats) {//look at where the whisper folder would be
		if (!err && stats.isDirectory()) {
			file = fs.createWriteStream(folderPath + fileName, {flags: "w"});
			if (file) {
				addWhisperLogger(function(s) {
					file.write(s + "\r\n");//in case you open files made on mac in windows
				});
			}
		}
	});
}

function composeWhisperPrefix() {
	function widen(n, s) { s = s+""; while (s.length < n) { s = "0"+s; } return s; }
	var d = new Date(Date.now());
	return d.getFullYear()+"y"+widen(2, (d.getMonth()+1))+"m"+widen(2, d.getDate())+"d " +
		widen(2, d.getHours())+"h"+widen(2, d.getMinutes())+"m"+widen(2, d.getSeconds())+"."+widen(3, d.getMilliseconds())+"s " +
		process.pid+"pid";
}






whisper("main.js end");