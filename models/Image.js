const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
	link:{
		type:String,
		require:true
	},
	contentAt:{
		type:String,
		require:true
	},
	updatedAt:{
		type:String,
		require:true
	},
	
});
const Image = mongoose.model('Image',imageSchema);
module.exports = Image;