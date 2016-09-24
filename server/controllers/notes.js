// var Note = require('../models/note.js');
var mongoose = require('mongoose');
var Note = mongoose.model('Note');

module.exports = (function(){
	return {
			add: function(res, req){
				var data_obj = { 
									name: res.body.name,
									location: {
										long: res.body.long,
										lat: res.body.lat
							 	    }
								}
				var new_note = new Note(data_obj);
				new_note.save(function(err, data){
					req.redirect('/');
				})

			},
			find_by_location: function(res, req){

			},

			find_by_name: function(res, req){

			},

			index: function(res, req){
				res.render('index')
			}





	}
})()