console.log("preload.js\\");
console.log(`process.pid ${process.pid}
__filename ${__filename}
__dirname  ${__dirname}`);

const {runByNode, runByElectron, runByElectronMain, runByElectronRenderer} = require("./main-library.js");

doRendererStuff();
function doRendererStuff() {
	console.log("do renderer stuff...");
	window.addEventListener("DOMContentLoaded", doLoadedStuff);
}

function doLoadedStuff() {
	console.log("do loaded stuff...");
	require("./page.js");//run page.js once the dom is loaded and really everything is really ready
}

console.log("preload.js/");
