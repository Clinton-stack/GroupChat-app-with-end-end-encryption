const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/Users');
const Message = require('../models/Messages');
const auth = require('../middleware/auth');
const AES = require('../config/aes-encryption');



// @route GET api/messages
// @desc get all messages
// @access private 
router.get('/', auth, async(req, res) => {
    try {

        const messages = await Message.find();

        messages.forEach((msg) => {
            console.log(msg.text);
            AES.decrypt(msg.text);
        });
        
        res.json(messages);
        

        
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Internal Sever Error" }); 
    }
});

// @route POST api/messages
// @desc add messages
// @access private 
router.post('/', [auth, [check('text', 'Please enter a message').not().isEmpty(),]], async(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const encrytedText = AES.encrypt(req.body.text);
        
        const message = new Message({
            text: encrytedText,
            user: req.user.id,
            name: user.name,
            avatar: user.avatar
        });

        const msg = await message.save();

        res.json(msg);
        
    } catch (error) {
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
        //check if user owns post
        if (message.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not Authorized' });

        }
        //check if msg exists
        if(!mesage){
            return res.status(400).json({ msg: 'message does not exist ' });
        }

        //if users role is admin
        const user = await User.findById(req.user.id).select('-password');
        if(user.role.toString() === 'ADMIN'){
            await message.remove();
            return res.json({ msg: 'Message sucessfully deleted' });
        }

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
