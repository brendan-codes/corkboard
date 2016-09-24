// var Note = require('../models/note.js');
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

module.exports = (function(){
	return {
			add: function(req, res){
				var data_obj = {
									name: req.body.name,
									lat: req.body.lat,
									long: req.body.long
								}
				var new_note = new Note(data_obj);
				new_note.save(function(err, data){
					res.redirect('/');
				})

			},
			find_by_location: function(req, res){
				console.log(parseFloat(req.body.lat));
				console.log("radius", req.body.radius);
				// res.redirect('/');

        var latTraveledMiles = 100;
        var latTraveledKM = 100 * 0.621371;
        var latTraveledDeg = (1 / 110.54) * latTraveledKM;

        console.log("latTraveledDeg", latTraveledDeg);

				var finder_object = {
										lat: {
												$gt: parseFloat(req.body.lat) - 0.1,
												$lt: parseFloat(req.body.lat) + 0.1
											 },
									    long: {
									    		$gt: parseFloat(req.body.long) - 0.1,
									    		$lt: parseFloat(req.body.long) + 0.1
									   		  }
									}


				Note.find(finder_object, function(err, results){
					console.log(results);
					res.redirect('/');
				})
			},

			find_by_name: function(res, req){

			},

			index: function(res, req){
				res.render('index')
			}





	}
})()
