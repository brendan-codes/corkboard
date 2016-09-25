var mongoose = require('mongoose');
var geocoder = require('geocoder');
var config_geocoder = require('../../config_geocoder.js')
var Note     = mongoose.model('Note');
var fs       = require('fs');

module.exports = (function(){
	return {
			add: function(req, res){
				var lat;
				var long;
				console.log(req.body)
				var clean_name = req.body.name.trim().toLowerCase();

				if(req.body.location !== null){
					console.log(req.body.location)
					geocoder.geocode(req.body.location, function ( err, data ) {
						lat = data.results[0].geometry.location.lat
						long = data.results[0].geometry.location.lng
					
							var data_obj = {
									name: clean_name,
									age: req.body.age,
									address: req.body.location,
									lat: lat,
									long: long,
									note: req.body.note,
									contact: req.body.contact
								}
							Note.create(data_obj, function(err, result){
								console.log(data_obj.lat, "data_object.lat")
								res.json(data_obj.lat, data_obj.long);
							})				
						})
					}
			},
			get_by_id: function(req, res){
				Note.findOne({_id: req.params.id}, function(err, found_note){
					if(err){
						res.json('error!');
					}else{
						res.json(found_note);
					}
				});
			},
			add_reply: function(req, res){
				var reply = {
				   reply: req.body.reply,
				   contact: req.body.contact
				};
				Note.update({_id: req.body.id}, {$addToSet: {replies: reply}, timeout: Date.now(), updated_at: Date.now()}, function(err, found_note){
					if(err){
						res.json('error!');
					}else{
						// var reply = {
						// 			   reply: req.body.reply,
						// 			   contact: req.body.contact
						// 			}
						// found_note.replies.push(reply);
						// found_note.timeout = Date.now;
						// found_note.updated_at = Date.now;
						// console.log(found_note);
						// found_note.save(function(err, success){
						// 	console.log(success);
						res.json("sucess");
						// })
					}
				});
			},
			all: function(req, res){
				Note.find({}, function(err, notes){
					console.log(notes);
					if(err){
						res.json(err);
					}else{
						res.render('sandbox', {notes: notes});
					}
				})
			},
			add_image: function(req, res){

				console.log(req.file);
				console.log(req.body);
				// res.end();

				var new_path = req.file.path.split('client/').join('');

				Note.update({_id: req.body.id}, {image: new_path}, function(err, results){
					console.log(results);
				})



				// fs.readFile(req.file.path, function(err, data){
				// 	// console.log(__dirname);
				// 	var newPath = __dirname + '/../../client/img';
				// 	console.log(newPath);
				// 	fs.writeFile(newPath, data, function(err){
				// 		res.end();
				// 	})
				// })
			},
			find_by_location: function(req, res){
				console.log(req.body.search_location, "req")

		      	geocoder.geocode(req.body.search_location, function ( err, data ) {
					// console.log("in geocoder", data.results[0].geometry.bounds)
					console.log(data.results[0].geometry.location.lat)
					console.log(data.results[0].geometry.location.lng)
					lat = data.results[0].geometry.location.lat
					long = data.results[0].geometry.location.lng


					var finder_object = {
										lat: {
												$gt: parseFloat(lat) - 0.1,
												$lt: parseFloat(lat) + 0.1
											 },
									    long: {
									    		$gt: parseFloat(long) - 0.1,
									    		$lt: parseFloat(long) + 0.1
									   		  }
									}
					Note.find(finder_object, function(err, results){
						console.log(results);
						res.json(results);
					})
				});
			},
			find_by_name: function(req, res){
				if(req.body.name){
					var clean_name = req.body.name.trim().toLowerCase()
					Note.find({name: clean_name}, function(err, results){
						res.json(results);
					})
				}else{
					res.json('not a name');
				}
			}
	}
})()
