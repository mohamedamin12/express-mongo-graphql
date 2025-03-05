const mongoose = require('mongoose');



const commentSchema = new mongoose.Schema({
	consent:{
		type:String,
		require:true
	},
	userId:{
		type:Schema.Types.ObjectId,
		ref:'User',
		require:true
	},
	postId:{
		type:Schema.Types.ObjectId,
		ref:'Post',
		require:true
	}
	
});
const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;