const express= require('express')
const router = express.Router();
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const User= require('../models/User');
const config = require('config')

const { check, validationResult } = require('express-validator');

//@route POST api/users
//@desc Register a user
//@access Public
router.post('/',[
    check('name','Please provide name').not().isEmpty(),
    check('email','Please enter valid email').isEmail(),
    check('password','Please enter password with 6 or more characters').isLength({min:6})
],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {name,email,password}=req.body

    try {
        if (await User.findOne({email})){
            res.status(400).json({msg:"User already exist"})
        }

        const user= new User({
            name,email,password
        })

        const salt= await bcrypt.genSalt(10)

        user.password= await bcrypt.hash(password,salt);

        await user.save()
       
        const payload={
            user:{
                id:user.id
            }
        }
        
        jwt.sign(payload,config.get('jwtSecret'),{
            expiresIn:36000
        },(err,token)=>{
            if(err) throw err;
            res.send(token);
        });

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Server Error');
    }


    
});

module.exports =router;