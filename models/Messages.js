const mongoose = require('mongoose');

const MessagesSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: {type: Object, required: true},
    name: { type: String },
    avatar: { type: String },
    createdAt: { type: Date, expires: 36000, default: Date.now },
    
});

MessagesSchema.index({ createdAt: 1}, {expiresAfterSeconds: 86400})

module.exports = Message = mongoose.model('messages', MessagesSchema);
