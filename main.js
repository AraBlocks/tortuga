console.log("main.js\\");
console.log(`main.js - process.pid ${process.pid}
__filename ${__filename}
__dirname  ${__dirname}`);
console.log(`main.js - require ${typeof require}, module ${typeof module}, module.exports ${typeof module.exports}, exports ${typeof exports}`);

// Modules to control application life and create native browser window
const requireElectron = require("electron");
const requirePath = require("path");

const {runByNode, runByElectron, runByElectronMain, runByElectronRenderer} = require("./main-library.js");

doMainStuff();
function doMainStuff() {
	console.log("do main stuff...");

	const app = requireElectron.app;
	const BrowserWindow = requireElectron.BrowserWindow;

	// Keep a global reference of the window object, if you don't, the window will
	// be closed automatically when the JavaScript object is garbage collected.
	let mainWindow;

	function createWindow() {

		// Create the browser window.
		mainWindow = new BrowserWindow({
			width: 1000,
			height: 1000,
			webPreferences: {
				nodeIntegration: true
			}
		});

		var htmlFile = true ? "page-development.html" : "page-production.html";//pages for development or release

		// and load the index.html of the app.
		mainWindow.loadFile(htmlFile);

		// Open the DevTools.
		mainWindow.webContents.openDevTools();

		// Emitted when the window is closed.
		mainWindow.on("closed", function() {

			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			mainWindow = null;
		});
	}

	// This method will be called when Electron has finished
	// initialization and is ready to create browser windows.
	// Some APIs can only be used after this event occurs.
	app.on("ready", createWindow);

	// Quit when all windows are closed.
	app.on("window-all-closed", function() {
		// On macOS it is common for applications and their menu bar
		// to stay active until the user quits explicitly with Cmd + Q
		if (process.platform != "darwin" || true) {//close the whole thing on mac, too
			app.quit();
		}
	});

	app.on("activate", function() {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (mainWindow == null) {
			createWindow();
		}
	});

	// In this file you can include the rest of your app's specific main process
	// code. You can also put them in separate files and require them here.
}

console.log("main.js/");
