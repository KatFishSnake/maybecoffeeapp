(function() {
	var socket = io();

	var parent = document.getElementById("que-body");
	var list_el = parent.querySelector(".list");

	function getList() {
		// Retrieve initial data
		return CoffeeService.get("/api/list")
			.then(function(result) {
				var data = result;
				if (typeof data === "string") {
					data = JSON.parse(result);
				}

				return data.map(function(value) {
					return value.doc;
				});
			});
	}

	function removeNode(item) {
		getList().then(function(response) {

			// TODO find largest index here
			var node = list_el.querySelectorAll("li")[+item._id];
			node.remove();
		});
	}

	function createNode(content) {

		var item = document.createElement("li");
		item.setAttribute("class", "item");


		var icon = document.createElement("i");
		icon.setAttribute("class", "user icon");
		item.appendChild(icon);

		var init_container = document.createElement("div");
		init_container.setAttribute("class", "content");

		var name_txt = document.createTextNode(content.name);
		var name_el = document.createElement("p");
		name_el.setAttribute("class", "header");
		name_el.appendChild(name_txt);
		init_container.appendChild(name_el);

		var coffee_txt = document.createTextNode(content.msg);
		var coffee_el = document.createElement("div");
		coffee_el.setAttribute("class", "description");
		coffee_el.appendChild(coffee_txt);
		init_container.appendChild(coffee_el);

		var inner_list_el = document.createElement("div");
		inner_list_el.setAttribute("class", "list");
		var coffee_attrs = [
			"coffee",
			"shots",
			"diary",
			"flavour",
			"temp"
		];
		var order =
			content.temp + " " +
			content.coffee + " with '" +
			content.shots + "' shots, " +
			content.diary.toLowerCase() + " and " +
			content.flavour.toLowerCase();

		var temp_node_txt = document.createTextNode(order);
		var temp_node = document.createElement("div");
		temp_node.appendChild(temp_node_txt);
		inner_list_el.appendChild(temp_node);

		init_container.appendChild(inner_list_el);

		item.appendChild(init_container);

		list_el.appendChild(item);

		item.addEventListener("click", function(event) {
			if (content.hasOwnProperty("id")) {
				content._id = content.id;
			}
			if (content.hasOwnProperty("rev")) {
				content._rev = content.rev;
			}
			socket.emit("delete", content);
			event.preventDefault();
		});
	}

	function init() {
		getList().then(function(response) {
			response.map(function(item) {
				createNode(item);
			});
		});
	}

	init();

	socket.on("add", function(item) {
		createNode(item)
	});

	socket.on("delete", function(item) {
		removeNode(item)
	});
})();