"use strict";

module.exports = (function() {
	// Software
	var Promise = require('promise');
	var nano = require("nano")("http://localhost:5984");
	var db_name = "messages";
	var messages = nano.db.use(db_name);

	// Check if database exists prior to any requests
	function exists() {
		return new Promise(function(resolve, reject) {

			nano.db.get(db_name, function(outter_err, body) {

				if (outter_err) {
					if (outter_err.message === 'no_db_file') {
						// create database
						nano.db.create(db_name, function(err, body) {
							if (!err) {
								resolve({});
							} else {
								reject(err);
							}
						});
					} else {
						reject(outter_err);
					}
				} else {
					resolve({});
				}
			});
		});
	}

	function nextIndex() {
		return list().then(function(response) {
			response.sort(function(a, b) {
				return (+b.id) - (+a.id)
			});
			return (response[0] ? ((+response[0].id) + 1) : 0);
		});
	}

	function create(id, config) {
		return exists()
			.then(function() {
				return new Promise(function(resolve, reject) {
					messages.insert(config, id, function(err, body) {
						if (!err) {
							resolve(body);
						} else {
							reject(err);
						}
					});
				});
			});
	}

	function list() {
		var config = {
			"include_docs": true
		};
		return exists()
			.then(function() {
				return new Promise(function(resolve, reject) {
					messages.list(config, function(err, body) {
						if (!err) {
							resolve(body.rows);
						} else {
							reject(err);
						}
					});
				});
			});
	}

	function deleteDoc(id, rev_id) {
		return exists()
			.then(function() {

				return new Promise(function(resolve, reject) {
					messages.destroy(id, rev_id, function(err, body) {
						if (!err) {
							resolve(body);
						} else {
							reject(err);
						}
					});
				});
			});
	}

	return {
		list: list,
		create: create,
		delete: deleteDoc,
		index: nextIndex
	};
})();