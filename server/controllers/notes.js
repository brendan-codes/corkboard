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
				Note.find({location: {lat: req.body.lat}}, function(err, results){
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