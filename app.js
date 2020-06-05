console.log("app.js\\");

//at this point, all the files and elements should be loaded
//electron is finally done
//and you can start doing stuff with the actual application starting up

const {runByNode, runByElectron, runByElectronMain, runByElectronRenderer} = require("./main-library.js");
const {appendHead, tag, idn, PageText, getFrameLog, setFrameLog} = require("./page-library.js");


//uncomment this line to prove to yourself that JSX doesn't work here (and shouldn't)
//var x3 = <p>Hello</p>;






console.log("app.js/");
