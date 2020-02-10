
helloMessage = sayHello();

var appCounter = new Vue({
	el: '#appCounter',
	data: {
		count: 0,
		message: helloMessage
	},
	methods: {
		increment() {
			this.count++;
		}
	}
});

var appComponent = new Vue({
	el: '#appComponent',
	data: {
		message: "this is appComponent's data message"
	}
});

// 1. Define route components.
// These can be imported from other files
const Foo = { template: "<div>foo</div>" };
const Bar = { template: "<div>bar</div>" };

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
	{ path: "/foo", component: Foo },
	{ path: "/bar", component: Bar }
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
	routes: routes
});

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const appRouter = new Vue({
	router
}).$mount('#appRouter');

// Now the app has started!
