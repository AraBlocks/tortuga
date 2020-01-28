console.log("page.js\\");
console.log(`process.pid ${process.pid}
__filename ${__filename}
__dirname  ${__dirname}`);

const {runByNode, runByElectron, runByElectronMain, runByElectronRenderer} = require("./main-library.js");
const {appendHead, tag, idn, PageText, logPageText} = require("./page-library.js");






//make something, then change its message
pageUpdate();
function pageUpdate() {

	logPageText();//see the times between frames

	var pageTag = tag("<pageTag>", {
		properties: ["m"],
		template: `
			<div>
				<input type="button" value="Refresh" onClick="window.location.reload()"/>
				<p>
					<button @click="m.method1">Change Message</button>
				</p>
				<p>{{ m.message }}</p>
			</div>
		`,
		make() {
			var m = {
				id: idn(),
				message: "starting message",
				method1() {
					m.message = "updated message";
				}
			}
			return m;
		}
	});

	var page = pageTag.make();
};



console.log("page.js/");
