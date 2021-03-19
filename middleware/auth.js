const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //get token from header
    const token = req.header('Authorization');


    //Check if no token 
    if (!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }

    //Verify token 
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not Valid'});
    }

   
}