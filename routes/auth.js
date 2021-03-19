const express = require ('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require ('config');
const User = require('../models/Users');
const bcrypt = require ('bcryptjs');
const { check, validationResult } = require('express-validator');

// @route POST api/auth 
// @desc User login and get token
// @access public 

router.post('/', [
                check('email', 'Please include a valid email').isEmail(),
                check('password', 'Password is required').exists()
                ],
                async (req, res) => {
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                        return res.status(400).json({ errors: errors.array() });
                    } 

                    const {email, password} = req.body;

                    try {
                        // See if user exits
                        let user = await User.findOne({ email });
        
                        if (!user) {
                            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
                        }

                        // match credentials
                        const isMatch = await bcrypt.compare(password, user.password);

                        if (!isMatch) {
                            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] })
                        }

                        // return jsonwebtokens
                        const payload = {
                            user: { id: user.id }
                        }
                        let loggedinUser = await User.findOne({ email }).select('-password');
                        jwt.sign(payload, config.get('jwtSecret'),
                            { expiresIn: 7200 },
                            (err, token) => {
                                if (err) throw err;
                                //res.json({ token });

                                res.json({token, user: loggedinUser});
                                
                            }
                        )

                        
                    } catch (error) {
                        console.error(error.message);
                        res.status(500).send('Internal Server Error');
                        
                    }

});

module.exports = router;