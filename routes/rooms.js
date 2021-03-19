const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../models/Users");
const Message = require("../models/Messages");
const auth = require("../middleware/auth");

const Rooms = require("../models/Rooms");
const Users = require("../models/Users");

// @route GET api/rooms
// @desc get all rooms
// @access private
router.get("/", auth, async (req, res) => {
  try {
      
    const rooms = await Rooms.find();

    res.json(rooms);
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Internal Sever Error" });
  }
});

// @route POST api/rooms
// @desc add rooms
// @access private
router.post(
  "/",
  [auth, [check('room', 'Please enter a room name').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
        //check if user is admin
      const user = await Users.findById(req.user.id).select("-password");
      if (user.role.toString() !== "ADMIN") {
        res.status(401).json({ msg: "User not Authorized" });
      }
      //check is roomname already exist 
      const {room} = req.body
      let newRoom = await Rooms.findOne({room });

      if (newRoom) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Room already exist" }] });
      }
       newRoom = new Rooms({
        room
      });

      await newRoom.save();

      res.json({msg: "Room Successfully created"});
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Internal Sever Error" });
    }
  }
);

// @route delete api/rooms/:id
// @desc delete rooms
// @access private
router.delete("/:id", auth, async (req, res) => {
  try {
    //if users role is admin
    const user = await User.findById(req.user.id).select("-password");
    if (user.role.toString() !== "ADMIN") {
        return res.status(401).json({ msg: "User not Authorized" });
    }

    const room = await Rooms.findById(req.params.id);
    const message = await Message.find();

    if(message.room === req.params.id){
        await message.remove();
    }

    await room.remove();
    res.json({ msg: "Room sucessfully deleted" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "User not found" });
    }
    console.error(error.message);
    res.status(500).json({ msg: "Internal Sever Error" });
  }
});

module.exports = router;
