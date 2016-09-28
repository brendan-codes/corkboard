var mongoose = require('mongoose');
var geocoder = require('geocoder');
var config_geocoder = require('../../config_geocoder.js')
var Note     = mongoose.model('Note');
var fs       = require('fs');

module.exports = (function(){
	return {
			// ----------------------------------------- ///
			// ----------------- ADD ROUTE ------------- ///
			// ----------------------------------------- ///
			/*
			    Todo:
			    	- Error handling
			    	- Data scrubbing
			    	- Multiple names
			    	- Clean if/else tree
			*/
			add: function(req, res){
				var lat;
				var long;
				var clean_name = req.body.name.trim().toLowerCase();

				if(req.file){
					var image_path = req.file.path.split('client/').join('');
				}else{
					var image_path = 'imgs/defaultIcon.png';
				}

				if(req.body.location !== ''){

					geocoder.geocode(req.body.location, function ( err, data ) {
						lat = data.results[0].geometry.location.lat
						long = data.results[0].geometry.location.lng

						var data_obj = {
											name: clean_name,
											age: req.body.age,
											address: req.body.address,
											lat: lat,
											long: long,
											note: req.body.note,
											contact: req.body.contact,
											image: image_path
										};

						var new_note = new Note(data_obj);

						new_note.save(function(err, result){
							res.json(new_note);
						})
					})

				} else {

					var data_obj = {
										name: clean_name,
										age: req.body.age,
										address: req.body.address,
										lat: req.body.lat,
										long: req.body.long,
										note: req.body.note,
										contact: req.body.contact,
										image: image_path
									};

					var new_note = new Note(data_obj);

					new_note.save(function(err, result){
						res.json(new_note);
					});
				}
			},
			// ----------------------------------------- ///
			// ----------------- GET BY ID ------------- ///
			// ----------------------------------------- ///
			get_by_id: function(req, res){
				Note.findOne({_id: req.params.id}, function(err, found_note){
					if(err){
						res.json('error!');
					}else{
						res.json(found_note);
					}
				});
			},
			// ----------------------------------------------- ///
			// ----------------- ADD REPLY BY ID ------------- ///
			// ----------------------------------------------- ///
			add_reply: function(req, res){
				var reply = {
				   reply: req.body.reply,
				   contact: req.body.contact
				};
				Note.update({_id: req.body.id}, {$addToSet: {replies: reply}, timeout: Date.now(), updated_at: Date.now()}, function(err, found_note){
					if(err){
						res.json('error!');
					}else{
						res.json("sucess");
					}
				});
			},
			// ----------------------------------------- ///
			// ----------------- ALL NOTES ------------- ///
			// ---------------------------------------- ///
			all_notes: function(req, res){
				Note.find({}, function(err, notes){
					console.log(notes);
					if(err){
						res.json(err);
					}else{
						res.json(notes);
					}
				})
			},
			// ----------------------------------------------- ///
			// ----------------- ADD IMAGE TO ID ------------- ///
			// ----------------------------------------------- ///
			add_image: function(req, res){
				var new_path = req.file.path.split('client/').join('');

				Note.update({_id: req.body.id}, {image: new_path}, function(err, results){
					console.log(results);
					res.end();
				})
			},
			// ------------------------------------------------ ///
			// ----------------- FIND BY LOCATION ------------- ///
			// ------------------------------------------------ ///
			find_by_location: function(req, res){
		      	geocoder.geocode(req.body.search_location, function ( err, data ) {
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
			// -------------------------------------------- ///
			// ----------------- FIND BY NAME ------------- ///
			// -------------------------------------------- ///
			find_by_name: function(req, res){
				if(req.body.name){
					var clean_name = req.body.name.trim().toLowerCase()
					Note.find({name: {'$regex': clean_name}}, function(err, results){
						res.json(results);
					})
				}else{
					res.json('not a name');
				}
			}
			// ------------------------------------------------------- ///
			// ----------------- RENDER ALL FOR SANDBOX -------------- ///
			// ------------------------------------------------------- ///
			all: function(req, res){
				Note.find({}, function(err, notes){
					console.log(notes);
					if(err){
						res.json(err);
					}else{
						res.render('sandbox', {notes: notes});
					}
				})
			}
	}
})()
