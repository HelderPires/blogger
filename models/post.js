var mongoose = require('mongoose');
module.exports = mongoose.model('Post', {
	title: String,
	body: String,
	publishDate: String
});