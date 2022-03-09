const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController')
const ProfileController = require('./controllers/ProfileController')
const {protect} = require('./middleware/authMiddleware')

router.get('/me', protect, UserController.getUser)
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/profile', ProfileController.getProfiles)
router.post('/profile/create', protect, ProfileController.newProfile)
router.put('/profile/edit/:id', protect, ProfileController.editProfile)
router.delete('/profile/delete/:id',protect, ProfileController.deleteProfile)


module.exports = router;