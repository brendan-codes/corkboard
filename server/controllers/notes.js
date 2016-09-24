var Note = require('../models/note.js');

module.exports = (function(){
	return {
			add: function(req, res){
				console.log(req.body);
				req.redirect('/');
			},
			find_by_location: function(req, res){

			},

			find_by_name: function(req, res){

			},

			index: function(req, res){
				res.render('index')
			}





	}
})()