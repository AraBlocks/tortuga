console.log("tags.js\\");
console.log("React is a "          + typeof React);
console.log("React.useState is a " + typeof React.useState);
console.log("ReactDOM is a "       + typeof ReactDOM);

console.log("require is " + typeof require);//somehow require is here
console.log("exports is " + typeof exports);//but exports is not
console.log("global is " + typeof global);//but exports is not



/*
in page.html has got this line:

<script type="text/babel" src="tags.js"></script>

so here are some warnings specific to this file
-this is the only place you can use JSX, so all the React components go here
-we're sending it through babel once on electron renderer start, so keep it short
-functions and vars on the margin becomg global to all the other nonde-style js files
-you can use require() here, it doesn't rerun an already loaded js file
-you can't use exports. here, but you don't need to, because everything becomes global

don't require something here for the first time, though, because then you're worried that babel is going to try to process it
*/





const {sayP, pageSaysPT} = require("./page-library.js");







var useState = React.useState;

function CounterComponent(props) {
	var [count, setCount] = useState(0);

	function myClick() {
		console.log(tagsSaysTP());
		console.log(pageSaysPT());


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



//functionInTags();
function functionInTags() {
	console.log("ran a function in tags.js");



}



//you can only say T in tags.js
function sayT() { return "T"; }
//global.sayT = sayT;

function tagsSaysTP() {
	return `tags says "${sayT()}${sayP()}"`;
}

















console.log("tags.js/");
