const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  room: { type: String, required: true },
  created: {type: Date, default: Date.now()}

});

module.exports = Room = mongoose.model('rooms', RoomSchema);
