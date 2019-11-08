console.log("library.js\\");



// Find out what's running us
function runByNode()             { return typeof process.versions.electron != "string"  } // Command line Node
function runByElectron()         { return typeof process.versions.electron == "string"  } // Electron
function runByElectronMain()     { return runByElectron() && process.type != "renderer" } // Electron's main or browser process, that has no page
function runByElectronRenderer() { return runByElectron() && process.type == "renderer" } // An Electron renderer process, with a page

module.exports.runByNode = runByNode;
module.exports.runByElectron = runByElectron;
module.exports.runByElectronMain = runByElectronMain;
module.exports.runByElectronRenderer = runByElectronRenderer;



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

module.exports.whisper = whisper;
module.exports.addWhisperLogger = addWhisperLogger;







console.log("library.js/");
