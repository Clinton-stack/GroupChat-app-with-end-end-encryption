const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  text: { type: mongoose.Schema.Types.ObjectId, ref: "messages" },
  room: { type: Object, required: true },

});

module.exports = Room = mongoose.model("rooms", MessagesSchema);
