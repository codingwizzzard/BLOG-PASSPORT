const fs = require('fs')
const blogDB = require('../models/blog.schema')
const userDB = require('../models/user.schema')

const indexPage = async (req, res) => {
    try {
        let data = await blogDB.find({})
        res.render('index', { data })
    } catch (error) {
        console.log(error)
        return false
    }
}

const add = async (req, res) => {
    try {
        res.render('add')
    } catch (error) {
        console.log(error)
        return false
    }
}

const addPage = async (req, res) => {
    const { title, description, category, name, date, id } = req.body
    let image
    try {
        if (id) {
            if (req.file) {
                image = req.file.path
                let data = await blogDB.findById(id)
                fs.unlinkSync(data.image)

                await blogDB.findByIdAndUpdate(id, { title, description, category, name, date, image })
                res.redirect('/')
            } else {
                let data = await blogDB.findById(id)
                image = data.image
                await blogDB.findByIdAndUpdate(id, { title, description, category, name, date, image })

                res.redirect('/')
            }
        } else {

            image = req.file.path

            await blogDB.create({ title, description, category, name, date, image })
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        return false
    }
}

const editData = async (req, res) => {
    let { id } = req.params
    try {
        let data = await blogDB.findById(id)
        res.render('edit', { data })
    } catch (err) {
        console.log(err)
        return false
    }
}

const viewtbl = async (req, res) => {
    try {
        let data = await blogDB.find({})
        res.render('viewtbl', { data })
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteData = async (req, res) => {
    let { id } = req.params
    try {
        let data = await blogDB.findById(id)
        fs.unlinkSync(data.image)

        await blogDB.findByIdAndDelete(id)
        res.redirect('/viewtbl')
    } catch (error) {
        console.log(error)
        return false
    }
}

// controllers for user data

const signup = async (req, res) => {
    const { username, email, password, phone } = req.body
    try {
        await userDB.create({ username, email, password, phone })
        res.redirect('/login')
    } catch (error) {
        console.log(error)
        return false
    }
}

const signupPage = (req, res) => {
    return res.render('signup')
}

const loginPage = (req, res) => {
    return res.render('login')
}

const logout = async (req, res) => {
    console.log("before logging out :", req.user)
    req.logOut((err) => {
        if (err) {
            console.log(err)
        }
    })
    console.log("after logging out:", req.user)
    return res.redirect('/login')
}

const getData = async (req, res) => {
    try {
        let data = await userDB.find({})
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

const profile = (req, res) => {
    res.send(req.user)
}

module.exports = { indexPage, add, addPage, editData, viewtbl, deleteData, signupPage, loginPage, logout, getData, signup, profile }