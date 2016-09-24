var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
	name: String,
	hashname: String,
	location: {
				address: String,
				long: Number,
				lat: Number
			   },
	note: String,
	contact: String,
	notes: [{message: String, contact: String, created_at: String}],
	timeout: Date,
	created_at: Date,
	updated_at: Date
});

mongoose.model('Note', NoteSchema);