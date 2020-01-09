console.log("main-library.js\\");



// Find out what's running us
function runByNode()             { return typeof process.versions.electron != "string"  } // Command line Node
function runByElectron()         { return typeof process.versions.electron == "string"  } // Electron
function runByElectronMain()     { return runByElectron() && process.type != "renderer" } // Electron's main or browser process, that has no page
function runByElectronRenderer() { return runByElectron() && process.type == "renderer" } // An Electron renderer process, with a page

exports.runByNode = runByNode;
exports.runByElectron = runByElectron;
exports.runByElectronMain = runByElectronMain;
exports.runByElectronRenderer = runByElectronRenderer;















console.log("main-library.js/");
