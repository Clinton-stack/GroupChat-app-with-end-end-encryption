const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')
const User = require('../models/Users');
const auth = require('../middleware/auth')

// @route POST api/user
// @desc add users
// @access private 
router.post('/', auth, [
                check('email', 'Please enter a valid email').isEmail(),
                check('name', 'Name is required').not().isEmpty(),
                check('role', 'User Role is required').not().isEmpty(),
                check('password', 'Password must be 6 or more characters long').isLength({min: 6})
            ], async(req, res) => {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
                }

                const {name, email, password, role} = req.body;
                try {
                   //check if user already exists
                   let user = await User.findOne({email});

                   if(user){
                       return res.status(400).json({errors: [{msg: 'Email already register'}]});
                   }

                    // get users gravatar
                    const avatar = gravatar.url(email, {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    });

                    user = new User({name, email, password, role, avatar});
                    //Encrypt passowrd 
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(password, salt);

                    await user.save()

                    // return json webtokens 
                    const payload = { user: {id: user.id} };
                    const secret = config.get('jwtSecret');
                    jwt.sign(payload, secret, {expiresIn: 36000000}, (err, token) => {
                       if(err) throw err;
                       res.json({token}); 
                    });



                    
                } catch (error) {
                    console.error(error.message);
                    res.status(500).send('Internal Server Error');
                    
                }
                 

});

// @route GET api/user
// @desc LISt all users
// @access private 
router.get('/', auth, async (req, res) => {

        try {
            const users = await User.find().select('-password');
            res.json(users)
        } catch (error) {
            console.error(error.message);
            return res.status(500).send( 'Internal Server Error');
        }    
});

// @route DELETE api/user
// @desc delete user by id
// @access private 
router.delete('/:id', auth, async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({msg: 'User doesnt exist'})
        }

        await user.remove();
        res.json({msg: 'User sucessfully deleted'});
        
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'User not found' });
        }
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
});

module.exports = router;