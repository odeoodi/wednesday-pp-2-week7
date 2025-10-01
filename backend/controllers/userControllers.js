const User = require('../models/userModel');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'});
}

const signupUser = async (req,res) => {
    const {
        name, 
        username, 
        password, 
        role,
        bio
} = req.body;
    
        try{
            if(
                !name || 
                !username || 
                !password ||
                !role || 
                !bio 
               ) {
                    res.status(400)
                    throw new Error('All fiels are required');
                }
                const userExists = await User.findOne({username});

                if(userExists){
                    res.status(400)
                    throw new Error('User already exists');
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = await User.create({name, 
                                                username, 
                                                password: hashedPassword, 
                                                role,
                                            bio});
                if(user){
                    const token = createToken(user._id);
                    res.status(201).json({username, token});
                }else {
                    res.status(400)
                    throw new Error('Invalid user data');
                }
            }catch(err){
                res.status(400).json({error: err.message});
            }
}

const loginUser = async (req,res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(user && (await bcrypt.compare(password, user.password))){
            const token = createToken(user._id)
            res.status(200).json({username, token});
        }else{
            res.status(400)
            throw new Error('Invalid credentials');
        }
    }catch(err){
        res.status(400).json({error: err.message});
    }
}
module.exports = {signupUser, loginUser};