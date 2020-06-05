console.log("tags.js\\");
console.log(`tags.js - process.pid ${process.pid}
__filename ${__filename}
__dirname  ${__dirname}`);
console.log(`tags.js - require ${typeof require}, module ${typeof module}, module.exports ${typeof module.exports}, exports ${typeof exports}`);

/*
This is the line in the HTML that got us here:

<script type="text/babel" src="tags.js"></script>

* This is the only place you can use JSX, so define all the React elements here.
* Babel transforms this file once each time the program runs, so keep it short and factor non-JSX elsewhere.
* Functions and vars on the margin become global to all the other js files!
* You can use require() here, and it won't re-run a js file that's already been required.
* You can't use exports. here, but you don't need to, because everything becomes global.

ok, so actually, elsewhere in node you've got module, module.exports, and exports
here in tags, you've got module and module.exports, just not exports
so what you should probably do is wrap this whole file in an anonymous function
and then use exporty() to try to put things on module.exports
if you do that, can you import tags.js from app.js?
which would be weird because you shouldn't require it anywhere, because it needs to go through babel
so you're leaving this alone for now
*/


//the renderer already require()d page.js and page-library.js
//you can require them here to use them, even from babel
//and doing this won't rerun those files
const {sayP, pageSaysPT} = require("./page-library.js");

//you can only say T in tags.js
function sayT() { return "T"; }
function tagsSaysTP() { return `tags says "${sayT()}${sayP()}"`; }


//let's do some React with hooks
var useState = React.useState;

function CounterComponent(props) {
	var [count, setCount] = useState(0);

	function myClick() {

		//demonstrate calling between tags.js and the already require()d files
		console.log(tagsSaysTP());//calls here, which calls into page-library.js for sayP()
		console.log(pageSaysPT());//calls into page-library.js, which calls back here to sayT()

		setCount(count + 1);
	}

	return (
		<div>
			<p><i>~ counter component ~</i></p>
			<p>
				This counter is named "{props.name}".{" "}
				<button onClick={myClick}>Click Me</button>{" "}
				You clicked {count} times.
			</p>
		</div>
	);
}

function ReactPage(props) {
	return (
		<div>
			<p><i>~ react page component ~</i></p>
			<CounterComponent name={"counter1"}/>
			<CounterComponent name={"counter2"}/>
		</div>
	);
}

var reactPage = ReactPage();
ReactDOM.render(reactPage, document.getElementById("pager"));


//JSX works here, of course, but *not* in app.js, which is great
var x1 = <p>Hello</p>;

//tags.js will run last even if you put another script tag below ours in the page
require("./app.js");




console.log("tags.js/");
