console.log("page.js\\");
console.log(`process.pid ${process.pid}
__filename ${__filename}
__dirname  ${__dirname}`);

const {runByNode, runByElectron, runByElectronMain, runByElectronRenderer} = require("./main-library.js");
const {appendHead, tag, idn, PageText, getFrameLog, setFrameLog} = require("./page-library.js");







function buttonText() {
	if (getFrameLog()) return "Stop logging milliseconds between frames";//it's on, button turns it off
	else               return "Log milliseconds between frames";//it's off, button turns it on
}




var frameTag = tag("<frameTag>", {
	properties: ["m", "i"],
	template: `
			<div class="box">
				index{{ i }}: This is a frame with id "{{ m.id }}", timestamp "{{ m.made }}", and message "{{ m.message }}"
				<button @click="m.close(i)">Close</button>
				<demo1Tag v-if="m.demoOn" :key="m.demoModel.id" :m="m.demoModel"></demo1Tag>
				<demo2Tag v-if="m.demoOn" :key="m.demoModel.id" :m="m.demoModel"></demo2Tag>
			</div>
		`,
	make(message, container, demoTag, demoModel) {
		var m = {
			id: idn(),

			message: message,
			container: container,

			demoTag: demoTag,
			demoModel: demoModel,

			made: Date.now()+"",
			close(i) {
				container.removeFrameAtIndex(i);
			}
		};


		console.log(`demoTag ${m.demoTag}, demoModel typeof ${m.demoModel}`);











		return m;
	}
});





var demo1Tag = tag("<demo1Tag>", {
	properties: ["m", "i"],
	template: `
			<div>
				<p>This is Demo 1</p>
			</div>
		`,
	make(message) {
		var m = {
			id: idn(),
			message: message
		};
		return m;
	}
});



var demo2Tag = tag("<demo2Tag>", {
	properties: ["m", "i"],
	template: `
			<div>
				<p>This is Demo 2</p>
			</div>
		`,
	make(message) {
		var m = {
			id: idn(),
			message: message,
		};
		return m;
	}
});












//first just make a frame that contains a single demo, then have it be a single either demo1 or demo2
//you can pass make() an object, too: make the new demo and then put it in a frame this way









var pageTag = tag("<pageTag>", {
	properties: ["m"],
	template: `
		<div>
			<p>
				<button @click="m.refresh">Browser Refresh</button>
				<button @click="m.openDevTools">Open Dev Tools</button>
				<button @click="m.toggleFrameLog">{{ m.toggleText }}</button>
			</p>
			<p>
				<button @click="m.method1">Change Message</button>
				<button @click="m.demo1">Demo 1</button>
				<button @click="m.demo2">Demo 2</button>
				<button @click="m.demo3">Demo 3</button>
			</p>
			<div>
				<frameTag v-for="(n, index) in m.a" :key="n.id" :m="n" :i="index"></frameTag>
			</div>
			<p>{{ m.message }}</p>
		</div>
	`,
	make() {
		var m = {
			id: idn(),
			a: [],
			message: "starting message",
			toggleText: buttonText(),
			method1() {
				m.message = "updated message";
			},
			refresh() {
				window.location.reload();
			},
			openDevTools() {
				//TODO replace this horrible hack, here temporarily for convenience, with an actual understanding of IPC in Electron
				require("electron").remote.BrowserWindow.getAllWindows()[0].openDevTools();
			},
			toggleFrameLog() {
				setFrameLog(!getFrameLog());//toggle the logs on or off
				m.toggleText = buttonText();//say what the button does next
			},
			demo1() { m.a.push(frameTag.make("demo1", m, demo1Tag, demo1Tag.make("demo1 message"))); },//pass in this model m as the new frame's container
			demo2() { m.a.push(frameTag.make("demo2", m, demo2Tag, demo2Tag.make("demo2 message"))); },
			demo3() { m.a.push(frameTag.make("demo3", m)); },
			removeFrameAtIndex(i) {//a frame at index i is telling us to remove it
				m.a.splice(i, 1);
			}
		}
		return m;
	}
});
var page = pageTag.make();





//make a list of things, then add some more, then remove some
function pageGrow() {

	var pageTag = tag("<pageTag>", {
		properties: ["m"],
		template: `
			<div>
				<input type="button" value="Refresh" onClick="window.location.reload()"/>
				<p>
					<button @click="m.method1">Add 5</button>
					<button @click="m.method2">Remove Start</button>
					<button @click="m.method3">Remove Middle</button>
					<button @click="m.method4">Remove End</button>
				</p>
				<itemTag v-for="(n, index) in m.a" :key="n.id" :m="n" :i="index"></itemTag>
			</div>
		`,
		make() {
			var m = {
				id: idn(),
				a: [],
				method1() { for (var i = 0; i < 5; i++) m.a.push(itemTag.make("hello")); },
				method2() { m.a.splice(0, 1); },
				method3() { m.a.splice(m.a.length / 2, 1); },
				method4() { m.a.splice(m.a.length - 1, 1); }
			};
			return m;
		}
	});

	var itemTag = tag("<itemTag>", {
		properties: ["m", "i"],
		template: `<div>index{{ i }}: This is an item with id "{{ m.id }}", timestamp "{{ m.made }}", and message "{{ m.message }}"</div>`,
		make(message) {
			var m = {
				id: idn(),
				made: sayDateTemplate(now().time, "dddHH12:MMaSS.TTT") + "s",
				message: message
			};
			return m;
		}
	});

	var page = pageTag.make();
};



/*


there should be a "frame", and inside is each thing it can become
and the page has a list of frames
and the button makes a new one, and tells it what it should hold










the demo buttons shouldn't show or hide singleton demos
rather, they should create and destroy, both the dom element and the state
clicking demo1 button kills the others and creates demo1, and so on

later you can build this into icarus by having two clicks of the button create two, one of top of the other, and they have close Xs
actually maybe why not just do that now
they start with <hr> and [Close]

but they can't share state
*/



/*
//same thing, with a component
expose.main("page-update-component", function() {

	var pageTag = tag("<pageTag>", {
		properties: ["m"],
		template: `
			<div>
				<input type="button" value="Refresh" onClick="window.location.reload()"/>
				<p>
					<button @click="m.method1">Method 1</button>
					<button @click="m.method2">Method 2</button>
					<button @click="m.method3">Method 3</button>
				</p>
				<itemTag :m="m.model1"></itemTag>
				<itemTag :m="m.model2"></itemTag>
				<itemTag :m="m.model2"></itemTag>
			</div>
		`,
		make() {
			var m = {
				id: idn(),
				model1: itemTag.make("starting message 1"),
				model2: itemTag.make("starting message 2"),
				method1() {
					m.model1.message = "updated message 1";
				},
				method2() {
					m.model2.message = "updated message 2";
				},
				method3() {
					m.model1.message = "another update for 1";
					m.model2.message = "another update for 2";
				}
			};
			return m;
		}
	});

	var itemTag = tag("<itemTag>", {
		properties: ["m"],
		template: `<div>This is an item with {{ m.id }} and message "{{ m.message }}"</div>`,
		make(startingMessage) {
			var m = {
				id: idn(),//TODO ids not unique, but also not used as ids on the page, so maybe that's ok
				message: startingMessage
			};
			return m;
		}
	});

	var page = pageTag.make();
});
*/
































console.log("page.js/");
