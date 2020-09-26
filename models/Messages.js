const mongoose = require('mongoose');

const MessagesSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    room: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    text: {type: Object, required: true},
    name: { type: String },
    avatar: { type: String },
    date: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now, index: { expires: 3600 }
  }
});

module.exports = Message = mongoose.model('messages', MessagesSchema);
