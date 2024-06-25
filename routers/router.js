const { Router } = require("express")
const { indexPage, add, addPage, editData, deleteData, viewtbl, loginPage, logout, getData, signupPage, signup, profile } = require("../controllers/controller")
const upload = require("../middlewares/multer")
const { isAuth } = require("../middlewares/userAuth")
const passport = require("passport")

const router = Router()

router.get('/', isAuth, indexPage)
router.get('/add', add)
router.post('/add', upload, addPage)
router.get('/editData/:id', editData)
router.get('/viewtbl', viewtbl)
router.get('/deleteData/:id', deleteData)

router.get('/signup', signupPage)
router.post('/signup', signup)
router.get('/login', loginPage)
router.post('/login', passport.authenticate('local', { successRedirect: "/", failureRedirect: "/login" }))
router.get('/logout', logout)
router.get('/getData', getData)
router.get('/profile', isAuth, profile)

module.exports = router