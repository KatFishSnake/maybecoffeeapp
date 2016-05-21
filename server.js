"use strict";

// Custom scripts
var coffee = require("./js/server/coffee.js");
var helper = require("./js/server/helper.js");

// Software
var express = require('express');
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// App configuraiton
app.use(express.static('./public'));
app.use("/js", express.static('./js'));
app.use("/css", express.static('./css'));
app.use("/img", express.static('./img'));
app.use("/semantic", express.static('./vendor/semantic'));
app.use(require('express-promise')());

app.get("/api/list", function(req, res) {
	res.json(coffee.list());
});

app.get("/que", function(req, res) {
	res.sendFile("/home/andre/Documents/node/tut6/view/que.html");
});

app.get("/order", function(req, res) {
	res.sendFile("/home/andre/Documents/node/tut6/view/order.html");
});

app.get("/", function (req, res) {
	res.redirect("/que");
});

// Sockets configuration
io.on("connection", function(socket) {

	// On 'add'
	socket.on("add", function(config) {
		coffee.index().then(function(index) {
			var id = index.toString();

			return coffee.create(id, config);

		}).then(function (new_item) {

			io.emit("add", helper.merge(new_item, config));
		});
	});

	// On 'delete'
	socket.on("delete", function(config) {
		coffee
		.delete(config._id, config._rev)
		.then(function (response) {
			console.log(response);
			io.emit("delete", config);
		});

	});

	socket.on('disconnect', function() {
		console.log('User disconnected');
	});
});


// Set http listener
http.listen(3000, function() {
	console.log("Listening on 3k");
});