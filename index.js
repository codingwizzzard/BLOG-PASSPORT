const express = require('express')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const session = require('express-session')
const blogDB = require('./models/blog.schema')
const db = require('./config/database')
const router = require('./routers/router')
const userDB = require('./models/user.schema')
const localAuth = require('./middlewares/localAuth.middleware')
localAuth(passport)
const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads/'))
app.use(cookieParser())
app.use(session({ secret: "key", resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use('/', router)

app.listen(1303, (err) => {
    db()
    if (err) {
        console.log("Server is not started")
        return false
    }
    console.log("Server started at http://localhost:1303")
})