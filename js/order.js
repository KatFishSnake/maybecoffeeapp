(function() {
	var socket = io();

	var parent = document.getElementById("order-body");

	var submit_el = parent.querySelector(".place-order");
	var msg_el = parent.querySelector(".note");
	var name_el = parent.querySelector(".name");

	var coffee_el = parent.querySelector(".coffee");
	var shots_el = parent.querySelector(".shots");
	var temp_el = parent.querySelector(".temp");
	var diary_el = parent.querySelector(".diary");
	var flavour_el = parent.querySelector(".flavour");

	function init() {
		// Set click listeners
		submit_el.addEventListener("click", function(event) {
			socket.emit("add", {
				name: name_el.value,
				msg: msg_el.value,
				coffee: coffee_el.value,
				shots: shots_el.value,
				temp: temp_el.value,
				diary: diary_el.value,
				flavour: flavour_el.value,
				timestamp: (+new Date())
			});

			name_el.value = "";
			msg_el.value = "";
			coffee_el.value = "";
			shots_el.value = "";
			temp_el.value = "";
			diary_el.value = "";
			flavour_el.value = "";

			event.preventDefault();
		});
	}

	init();
})();