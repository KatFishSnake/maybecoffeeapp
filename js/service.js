"use strict";

var CoffeeService = (function() {

	function get(url) {
		return new Promise(function(resolve, reject) {

			var xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = function() {
				if (xhr.status === 200) {
					resolve(xhr.responseText);
				} else {
					reject(xhr.status);
				}
			};
			xhr.send();
		});
	}

	function post(url, data) {
		return new Promise(function(resolve, reject) {

			var xhr = new XMLHttpRequest();
			xhr.open('POST', url);
			xhr.onload = function() {
				if (xhr.status === 200) {
					resolve(xhr.responseText);
				} else {
					reject(xhr.status);
				}
			};
			xhr.send(JSON.stringify(data));
		});
	}

	return {
		get: get,
		post: post
	};
})();