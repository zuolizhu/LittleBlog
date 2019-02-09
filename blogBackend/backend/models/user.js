const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
});

// Collection name of this model is "users"
module.exports = mongoose.model('User', userSchema);
