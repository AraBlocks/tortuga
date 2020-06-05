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


	//and now that that's all required and done
/*
		<script type="text/babel" src="tags.js"></script>
*/
	var e = document.createElement("script");
	e.setAttribute("type", "text/babel");
	e.setAttribute("src", "tags.js");
	document.body.appendChild(e);



//ok sure but you're whole body is just one div, you know
/*
or do them all this way, and src in these:

		<script src="page_modules/babel.min.js"></script>
		<script src="page_modules/react.development.js"></script>
		<script src="page_modules/react-dom.development.js"></script>

oh yeah, then you can detect development versus production--this is a great idea!
and you can know for sure that all this happens after everything else

*/

}

/*
TODO

ok, you're trying to figure out how to get called when really everything is done and loaded
and this looks correct above, but actually, things look like this right now:

preload.js\
main-library.js\
main-library.js/
preload.js/
page.js\
page-library.js\
page-library.js/
page.js/
tags.js\
tags.js/

and there really isn't anything that's keeping tags at the bottom of that list, either
so you need to figure this out, or write some code at the bottom of tags.js that says "go" to the rest of the app once both page.js and tags.js are done

what if instead you got rid of preload
had page.js require both main and page libraries
and only added the tags.js script tag with babel to the page on dom content loaded

essentially, after require page.js above
that's when you manually add 







*/

console.log("preload.js/");
