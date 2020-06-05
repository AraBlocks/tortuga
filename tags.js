console.log("tags.js\\");

/*
This is the line in the HTML that got us here:

<script type="text/babel" src="tags.js"></script>

* This is the only place you can use JSX, so define all the React elements here.
* Babel transforms this file once each time the program runs, so keep it short and factor non-JSX elsewhere.
* Functions and vars on the margin become global to all the other js files!
* You can use require() here, and it won't re-run a js file that's already been required.
* You can't use exports. here, but you don't need to, because everything becomes global.
*/

console.log("tags.js - React is a "          + typeof React);
console.log("tags.js - React.useState is a " + typeof React.useState);
console.log("tags.js - ReactDOM is a "       + typeof ReactDOM);

console.log("tags.js - require is a " + typeof require);//somehow require is here
console.log("tags.js - exports is "   + typeof exports);//but exports is not
console.log("tags.js - global is a "  + typeof global);//but exports is not


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
