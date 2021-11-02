const express = require("express")
const router = express.Router()
const User = require("../models/User")
const bcrypt = require('bcryptjs')

router.get("/admin/users", (req, res) => {
    User.findAll().then(users => {
        res.render("admin/users", {users: users})
    })   
})

router.get("/admin/users/create", (req, res) => {
    res.render("admin/users/create", {alert: false})
})

router.get("/login", (req, res) => {
    res.render("admin/users/login")
}) 

router.post("/authenticate", (req, res) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({where:{email: email}}).then(user => {
        if(user != undefined){
            var correct = bcrypt.compareSync(password, user.password)
            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.emal
                }
                res.redirect("/admin/articles") //para testar
            } else {
                res.redirect("login")
            }
        } else {
            res.redirect("/login")
        }
    })
})

router.post("/users/create", (req, res) => {
    var email = req.body.email
    var password = req.body.password    

    User.findOne({where:{email: email}}).then( user => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10)
            var hash = bcrypt.hashSync(password, salt)

            User.create({
                email: email,
                password: hash    
            }).then(() => {
                res.redirect("/")
            }).catch(() => {
                res.redirect("/")    
            })

        } else {
            res.render("admin/users/create", {alert: true})
        }
    })
})

router.get("/logout", (req, res) => {
    req.session.user = undefined
    res.redirect("/")
})

module.exports = router