const mongoose = require('mongoose');

const MessagesSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: {type: Object, required: true},
    name: { type: String },
    avatar: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = Message = mongoose.model('messages', MessagesSchema);
