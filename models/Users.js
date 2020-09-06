const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({

   name: { type: String, required: true},
   email: {type: String, required: true},
   password: { type: String, required: true },
   role: {type: String, required: true},
   avatar: {type: String},
   createdAt:{type: Date, default: Date.now}

});

module.exports = User = mongoose.model('user', UserSchema);