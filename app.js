console.log("app.js\\");
console.log(`app.js - process.pid ${process.pid}
__filename ${__filename}
__dirname  ${__dirname}`);
console.log(`app.js - require ${typeof require}, module ${typeof module}, module.exports ${typeof module.exports}, exports ${typeof exports}`);

//at this point, all the files and elements should be loaded
//electron is finally done
//and you can start doing stuff with the actual application starting up

const {runByNode, runByElectron, runByElectronMain, runByElectronRenderer} = require("./main-library.js");
const {appendHead, tag, idn, PageText, getFrameLog, setFrameLog} = require("./page-library.js");


//uncomment this line to prove to yourself that JSX doesn't work here (and shouldn't)
//var x3 = <p>Hello</p>;



console.log("app.js/");
