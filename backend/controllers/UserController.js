const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const register = asyncHandler(async (req, res) => { 
    const {firstname, lastname, email, password, confirmPassword} = req.body

    
    if(!firstname || !lastname || !email || !password) {
        console.log(req.body)
        res.status(400)
        throw new Error('Please, fill all fields')
    }

    const userExists = await User.findOne({email})
    if(userExists) {
        res.status(400)
        throw new Error('E-mail already registered')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await User.create({
        firstname: firstname,
        lastname: lastname,
        email,
        password: hashedPassword,
        profiles: [{picture:"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png", name: `${firstname} ${lastname}`}]
    })

    if(user) {
        res.status(201).json({
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }
})

const login = asyncHandler(async (req,res) => { 
    const {email, password} = req.body

    const user = await User.findOne({email: email})
    
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profiles: user.profiles, 
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error("Email and password don't match")
    }
})

const getUser = asyncHandler(async (req,res) => {
    const {_id, firstname, lastname, profiles} = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        firstname,
        lastname,
        profiles
    })
})

const generateToken = (id) => { 
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = { 
    register,
    login,
    getUser
}

