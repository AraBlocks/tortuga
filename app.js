
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
