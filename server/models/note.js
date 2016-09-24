var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
	name: String,
	hashname: String,
	location: {
				address: String,
				long: Number,
				lat: Number
			   }
});

mongoose.model('Note', NoteSchema);