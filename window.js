console.log("window.js\\");
console.log(`process.pid ${process.pid}
__filename ${__filename}
__dirname  ${__dirname}`);

const requireLibrary = require("./library.js");
const whisper = requireLibrary.whisper;

whisper("hi from window.js");












//node:${runByNode()}, electron:${runByElectron()}, main:${runByElectronMain()}, renderer:${runByElectronRenderer()}`);




doRendererStuff();
function doRendererStuff() {
	whisper("doRendererStuff()");

	window.addEventListener("DOMContentLoaded", doLoadedStuff);
}


function doLoadedStuff() {
	whisper("WHICHFIRST? DOMContentLoaded");
	whisper("doLoadedStuff()");

/*
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector);
		if (element) element.innerText = text;
	} 
	
	for (const type of ['chrome', 'node', 'electron']) {
		replaceText(`${type}-version`, process.versions[type]);
	}
*/
}


















console.log("window.js/");
