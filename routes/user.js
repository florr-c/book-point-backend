const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, deleteUser, updatePassword, getProfile } = require ('../controllers/user.controller')

//middleware

router.use(

    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/delete', deleteUser)
router.post('/update', updatePassword)
router.get('/profile', getProfile)



module.exports = router