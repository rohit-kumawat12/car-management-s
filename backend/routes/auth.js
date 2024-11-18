const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

// For Create new user
router.post('/newuser', [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Email is required').notEmpty(),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password is required').notEmpty(),
    body('password','Password must be at least 5 characters').isLength({min:5})
], async (req, res)=>{

    const result = validationResult(req);
    let success= false;

    if (!result.isEmpty()) {
        return res.status(400).json({ success, result: result.array() });
    }

    let user = await User.findOne({email: req.body.email});
    if(user){
        let temp = [];
        temp.push({msg:"Sorry a user with this email already exists"});
        return res.status(400).json({success, result: temp});
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        });
        const savedUser = await user.save();
        const data = {
            user:{
                id: savedUser._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success=true;
        res.json({success, authToken});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

// For Authenticate a user
router.post('/login', [
    body('email', 'Email is required').notEmpty(),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password is required').notEmpty(),
    body('password','Password must be at least 5 characters').isLength({min:5})
], async (req, res)=>{

    const result = validationResult(req);
    let success= false;

    if (!result.isEmpty()) {
        return res.status(400).json({ success, result: result.array() });
    }

    const {email, password} = req.body;
    try{
        let user = await User.findOne({email: email});
        let temp = [];
        temp.push({msg:"Please try to login with correct credentials"});
        if(!user){
            return res.status(400).json({success, result:temp});
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, result:temp});
        }

        const data = {
            user:{
                id: user._id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success= true;
        res.json({success,authToken});
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});


// Get loggedin user details
router.post('/getuser', fetchuser, async (req, res) => {

    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch{
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

module.exports = router