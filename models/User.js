const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
}
);


userSchema.virtual('posts', {
	ref: 'Post',
	foreignField: 'userId',
	localField: '_id'
});

const User = mongoose.model('User', userSchema);

module.exports = User;