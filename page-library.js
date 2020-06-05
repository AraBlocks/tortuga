console.log("page-library.js\\");

const {runByNode, runByElectron, runByElectronMain, runByElectronRenderer} = require("./main-library.js");

//   _____           
//  |_   _|_ _  __ _ 
//    | |/ _` |/ _` |
//    | | (_| | (_| |
//    |_|\__,_|\__, |
//             |___/ 

// Use jQuery and Vue by their common names in the code here
let $, Vue;
if (runByElectronRenderer()) $ = require("jquery");
Vue = require("vue/dist/vue.js"); // Reach the build of Vue with the template compiler
exports.$ = $;
exports.Vue = Vue;

// Add the given CSS to the top of the HTML page Electron is showing
function appendHead(s) {
	$(s).appendTo("head"); // Have jQuery add it to the end of what's inside <head>
}
//TODO with page.html linking style.css, you don't need this, or maybe even jquery

// Register a new global Vue component from the given tag name like <someTag>, template text, and a make method that creates a new model object of data and methods
function tag(name, t) {

	// Parse tag name like "<someTag>" into name like "someTag"
	t.name = name.substring(1, name.length-1);
	if (!t.name.length) throw new Error("no tag name provided");

	// Register it as a global Vue component
	Vue.component(t.name, { props: t.properties, template: t.template });

	// If this is the root <pageTag>, add another step to its make() method to put it on the page
	if (name == "<pageTag>") {
		var make = t.make; // Point make at the pageTag.make() method
		t.make = function() { // Replace it with this make() method instead
			var m = make.apply(this, arguments); // Make the component and get its model m

			// All index.html has is <div id="page"></div>, create the root Vue instance there, and save it in m
			m.rootVueInstance = new Vue({
				el: '#page',
				template: `<div id="page"><pageTag :key="m.id" :m="m"/></div>`,
				data: { m: m }
			});
			return m; // Return the model object we just made
		}
	}
	return t; // Return the tag we made, use it like var m = t.make() to make a new instance of the tag and get it's model object
}

// Make a unique identifier for a new element on the page, from "idn1" through "idn9000000000000000" and then "idnn1", quick and infinite
var idn_i, idn_s;
function idn() {
	if (!idn_s) idn_s = "id"; // Starting prefix
	if (!idn_i || idn_i > 9000000000000000) { idn_s += "n"; idn_i = 1; } // It's over nine thousand! actually quadrillion
	return idn_s + idn_i++; // Increment number for next time
}

exports.appendHead = appendHead;
exports.tag = tag;
exports.idn = idn;

//   ____                 _____         _   
//  |  _ \ __ _  __ _  __|_   _|____  _| |_ 
//  | |_) / _` |/ _` |/ _ \| |/ _ \ \/ / __|
//  |  __/ (_| | (_| |  __/| |  __/>  <| |_ 
//  |_|   \__,_|\__, |\___||_|\___/_/\_\\__|
//              |___/                       

var slowAlarm = 25;  // Go slow if a frame arrives more than 25ms after the previous one, taking 1.5x as long as it should
var slowDelay = 800; // While going slow, skip frames to only update .8 seconds later, still feels faster that a stopwatch
//TODO probably change from 800 to 200 when you ship so it never looks frozen

/*
Given some text for the page, make a PageText object
Never touch f.v after handing it to Vue to watch
For rare state change updates like "100% Done", call f.update(), we'll have Vue change the DOM now
For frequent progress updates like "98%" and "99%", call f.updateProgress(), we'll have Vue change the DOM on the next animation frame
If DOM stress has caused a recent frame to arrive late, we'll do progress updates every 800ms rather than every frame
*/
function PageText(s) { // Take the starting text to show on the page
	if (typeof s != "string") throw new Error("you have to give PageText a string"); // PageText is just for text on the page, for objects use Vue directly

	var f = {}; // Make the new PageText object to fill and return
	f.vNext = s; // Current value that we'll get on the page soon
	f.vPage = s; // Our record of what's on the page
	f.v     = s; // Give v to Vue to watch, we'll change v and Vue will change the DOM

	f.update = function(s) { // First, last, or important change, force an update to Vue right now
		if (typeof s != "string") throw new Error("you have to give PageText a string");
		if (s != f.vPage) { // Keep away from v to not bother Vue, reading vPage is actually faster
			f.vNext = s; // Synchronize everything to s
			f.vPage = s;
			f.v     = s;
		}
	}

	f.updateProgress = function(s) { // Just another step along the progress bar, update in an animation frame later on
		if (typeof s != "string") throw new Error("you have to give PageText a string");
		f.vNext = s; // Replace a previously set upcoming value with this new most current one
		if (!f.inList && f.vNext != f.vPage) { // We're not already in the update list, and have text to change on the page
			frameList ? frameList.push(f) : frameList = [f]; // Add us to the list, or start a new list with us
			f.inList = true; // Avoid double-adding, this flag is a lot faster than searching the list
		}
	}

	f.inList = false;
	return f;
}

var frameList; // A list of PageText objects to update on a future animation frame
var frameWhen; // Tick when we last did the list

// If we have a web page, have this run on every animation frame, probably 60 times a second
if (runByElectronRenderer()) requestAnimationFrame(frameArrived);
function frameArrived() {

	var t = Date.now(); // Record that a new animation frame arrived now from the system
	arrivalsAdd(t); // Add it to our circular array of the most recent arrival times
	arrivalsLog();  // Call logPageText() to see the most recent 59 delays when we have a fresh 60

	// Never updated on a frame before, or all recent frames arrived fast, or there was a slow one but time to update anyway
	if (!frameWhen || !arrivalsSlow() || frameWhen + slowDelay < t) {
		frameWhen = t;
		frameUpdate();
	}

	requestAnimationFrame(frameArrived);
}

function frameUpdate() { // Update all the PageText objects we've kept for this frame
	if (frameList) {
		for (var i = 0; i < frameList.length; i++) { // Make one pass down the list
			var f = frameList[i];
			if (f.vNext != f.vPage) f.update(f.vNext); // Only update if necessary, could have been f.updateProgress("back to what's already on the page")
			f.inList = false; // We're not in the list anymore, this list or the next one we build up
		}
		frameList = null; // Toss out the list, we build it up anew every time
	}
}

var arrivalsCapacity = 60; // Keep a record of when the most recent 60 frames arrived
var arrivals;              // A circular array to hold them
var arrivalsCount;         // Current size, grows to 60 in the first second and stays there
var arrivalsStart;         // Index to the oldest arrival time, scans forward and goes 'round the horn

function arrivalsAdd(t) { // Add a new arrival time to our circular array
	if (!arrivals) { // First one ever
		arrivals = [t];
		arrivalsStart = 0;
		arrivalsCount = 1;
	} else if (arrivalsCount < arrivalsCapacity) { // Still filling up
		arrivals.push(t);
		arrivalsCount++;
	} else { // Full, replace the oldest one
		arrivals[arrivalsStart] = t;
		arrivalsStart++; if (arrivalsStart == arrivalsCapacity) arrivalsStart = 0; // Beyond the edge is the start
	}
}

function arrivalsSlow() { // True if we've got a pair of arrival times that are more than 25ms apart
	if (arrivalsCount > 1) { // Need at least a pair of arrival times
		var i = arrivalsStart;
		var j = i+1; if (j == arrivalsCount) j = 0;
		while (j != arrivalsStart) { // Loop for every pair of arrival times
			if (arrivals[i] + slowAlarm < arrivals[j]) return true; // Found a slow pair
			i++; if (i == arrivalsCount) i = 0; // Move on to the next pair
			j++; if (j == arrivalsCount) j = 0;
		}
	}
	return false; // No pairs yet, or all pairs are fast
}


var logOn = false;
function getFrameLog() { return logOn; }
function setFrameLog(b) { logOn = b; } // Just for testing, show what the last 60 arrival times looked like
function arrivalsLog() {
	if (logOn) {
		if (arrivalsStart == 0 && arrivalsCount == arrivalsCapacity) { // First 60, or a new 60 because we're back at the start
			var s = "";
			for (var i = 0; i < arrivalsCount - 1; i++) {
				var w = arrivals[i+1] - arrivals[i];
				s += (arrivals[i] + slowAlarm < arrivals[i+1]) ? w+"<----slow! " : w+" "; // Highlight the slow ones
			}
			console.log(s); // Shows up on the Console tab of Electron's Developer tools
		}
	}
}

exports.PageText = PageText;
exports.getFrameLog = getFrameLog;
exports.setFrameLog = setFrameLog;



//you can only say P in page-library.js
function sayP() {
	functionInTags();
	return "P";
}
exports.sayP = sayP;

function pageSaysPT() {
	return `page says "${sayP()}${sayT()}"`;
}
exports.pageSaysPT = pageSaysPT;









console.log("page-library.js/");
