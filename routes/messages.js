const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/Users');
const Message = require('../models/Messages');
const auth = require('../middleware/auth');
const AES = require('../config/aes-encryption');
const Rooms = require('../models/Rooms');



// @route GET api/messages/:roomId
// @desc get all messages
// @access private 
router.get('/:roomId', auth, async(req, res) => {
    try {
      const roomId = req.params.roomId;
      let  messages = await Message.find({room: roomId})
        const room = await Rooms.findById(roomId);
        if (!room) {
          return res.status(400).json({ msg: "Room doesnt exist" }); 
        }
        
      //  messages = messages.filter(msg =>{ (msg.room === roomId)
      //      console.log(msg.room, roomId);
      //   });

    
    

        // console.log(messages);
        let decryptedData =[];
        for (let i = 0; i < messages.length; i++) {
          let message = messages[i];
          let val = AES.decrypt(message.text);
          let messagenew = new Message({
            text: val,
            user: message.user,
            name: message.name,
            avatar: message.avatar,
            room: message.room,
            _id: message._id,
            createdAt: message.createdAt
          });
          decryptedData.push(messagenew);

        }
        res.json(decryptedData);
        

        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Sever Error" }); 
    }
});

// @route POST api/messages/:roomId
// @desc add messages
// @access private 
router.post('/:roomId', [auth, [check('text', 'Please enter a message').not().isEmpty(),]], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const encrytedText = AES.encrypt(req.body.text);
      

      const room = await Rooms.findById(req.params.roomId);
      if (!room) {
        return res.status(400).json({ msg: "Room doesnt exist" });
      }


      const message = new Message({
        text: encrytedText,
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
        room: room.id,
      });

      await message.save();

      const roomId = req.params.roomId;
      let  messages = await Message.find({room: roomId})

      let decryptedData =[];
        for (let i = 0; i < messages.length; i++) {
          let message = messages[i];
          let val = AES.decrypt(message.text);
          let messagenew = new Message({
            text: val,
            user: message.user,
            name: message.name,
            avatar: message.avatar,
            room: message.room,
            _id: message._id,
            createdAt: message.createdAt
          });
          decryptedData.push(messagenew);

        }

      res.json(decryptedData);
    } catch (error) {
         if (error.kind === "ObjectId") {
           return res.status(400).json({ msg: "Room not found" });
         }
        console.error(error.message);
        res.status(500).json({ msg: "Internal Sever Error" }) 
        
    }
});

// @route delete api/messages/:id
// @desc delete messages
// @access private 
router.delete('/:id', auth, async (req, res) => {

   
    try {
        const message = await Message.findById(req.params.id);
        const user = await User.findById(req.user.id);
        

         //check if msg exists
         if(!message){
          return res.status(400).json({ msg: 'message does not exist ' });
      }

        //check if user owns msg or user is admin
        if (
          (message.user.toString() !== req.user.id.toString())
          //(user.role.toString() !== 'ADMIN') 
        ) {
          console.log(user.role, req.user.id, message.user);
          return res.status(401).json({ msg: "User not Authorized" });
        }
       
        
        console.log(user.role, req.user.id, message.user);
        await message.remove();
        res.json({msg: 'Message sucessfully deleted'});

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'User not found' });
        }
        console.error(error.message);
        res.status(500).json({ msg: "Internal Sever Error" })

    }
});


module.exports = router
