const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true }
});

// Collection name of this model is "posts"
module.exports = mongoose.model('Post', postSchema);
