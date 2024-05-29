const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
	{
		"name": String,
		"category": String,
		"price": Number,
		"upvotes": Number,
		"downvotes": Number,
		"totalVotes": Number,
		"comments": [String],
		"user": {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	},
	{
		timestamps : true
	}
)

module.exports = mongoose.model('Item', ItemSchema);