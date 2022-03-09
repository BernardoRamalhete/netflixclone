const asyncHandler = require('express-async-handler')
const User = require('../models/user')

const getProfiles = asyncHandler(async (req, res) => {
    const user = await User.findById(req.body.id)
    const profiles = user.profiles

    res.status(200).json(profiles)
})

const newProfile = asyncHandler(async(req,res) => { 
    const {pictureURL, name, id } = req.body

    if(!name) {
        res.status(400).json({message: 'Enter a name for the new profile'})
        throw new Error('Enter a name for the new profile')
    }

    const user = await User.findById(id)

    if(user.profiles.filter((profile) => profile.name == name).length == 0) {
        user.profiles.push({picture: pictureURL, name: name})
        updatedProfileList = await User.findByIdAndUpdate(id, {profiles: user.profiles}, {new: true})
        res.status(200).json(updatedProfileList.profiles)
    } else {
        res.status(400).json({message: 'Profile names must be unique'})
        throw new Error('Profile names must be unique')
    }

})

const editProfile = asyncHandler(async (req,res) => { 
    const {newPicture, newName, userId} = req.body
    const profileId = req.params.id

    if(!newName && !newPicture) {
        res.status(400).json({message: 'No changes were made'})
        throw new Error('No changes were made')
    }

    const user = await User.findById(userId)

    if(user.profiles.filter(profile => profile.name == newName && profile._id != profileId).length == 0) {
        User.findOneAndUpdate(
            {id: userId, "profiles._id": profileId},
            {$set: {"profiles.$.picture": newPicture, "profiles.$.name": newName}},
            {new: true},
            (err, user) => {
                if(err) {
                    console.log(err)
                    res.status(400).json({message: "Couldn't find this profile, please try again later"})
                    throw new Error({message: "Couldn't find this profile, please try again later"})
                } else {
                    res.status(200).json(user)
                }
            }
        )
    } else {
        res.status(400).json({message: 'Profile names must be unique'})
        throw new Error('Profile names must be unique')
    }


})

const deleteProfile = asyncHandler(async(req,res) => {
    const {userId} = req.body
    const profileId = req.params.id

    if(!userId || !profileId) {
        res.status(400).json({message: "Couldn't fulfill this request, try again later"})
        throw new Error(`Couldn't fulfill this request, try again later. userId: ${userId}. profileId: ${profileId}`)
    }

    const user = await User.findById(userId)

    if(!user) { 
        res.status(400).json({message: 'We are having trouble finding your account'})
        throw new Error('We are having trouble finding your account')
    }
    if(user.profiles.length < 2) {
        res.status(400).json({message: 'You must have at least one profile, if you want to delete the existing one, please create a new profile before doing so'})
        throw new Error('You must have at least one profile, if you want to delete the existing one, please create a new profile before doing so')
    }
    
    const newProfileList = user.profiles.filter((profile) => profile._id != profileId)

    if(newProfileList.length === user.profiles.length) { 
        res.status(400).json({message: 'We are having trouble finding your profile, please try again later'})
        throw new Error('We are having trouble find your profile, please try again later')
    } else {
        User.findOneAndUpdate(
            {_id: userId},
            {profiles: newProfileList}, 
            {new: true},
            (err, user) => {
                if(err) { 
                    res.status(400).json({message: 'We are having trouble finding this profile'})
                    throw new Error('We are having trouble find this profile')
                } else {
                    res.status(200).json(user)
                }
            }
            )
    }
})

module.exports = {
    getProfiles,
    newProfile,
    editProfile, 
    deleteProfile
}