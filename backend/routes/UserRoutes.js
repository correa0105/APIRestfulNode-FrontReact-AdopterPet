const router = require('express').Router()

const UserController = require('../controllers/UserController')
const { imageUpload } = require('../middlewares/image-upload')
const verifyToken = require('../middlewares/verify-token')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/checkUser', UserController.checkUser)
router.get('/:id', UserController.getUserById)
router.patch('/edit/:id', verifyToken, imageUpload.single('image'), UserController.editUser)

module.exports = router