var mongoose = require('mongoose');

var NoteSchema = new mongoose.Schema({
	name: String,
	hashname: String,
	age: Number,
	address: String,
	lat: Number,
	long: Number,
	note: String,
	contact: String,
	image: String,
	replies: [{reply: String, contact: String, created_at: {type: Date, default: Date.now}}],
	timeout: {type: Date, default: Date.now},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

mongoose.model('Note', NoteSchema);