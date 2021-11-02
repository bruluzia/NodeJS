const express = require("express")
const router = express.Router()
const Reference = require("./Reference")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/references", adminAuth, (req, res) =>{
    Reference.findAll().then(references =>{
        res.render("admin/references/index", {references: references})
    })       
})

router.get("/admin/references/new", adminAuth, (req, res) => {
    res.render("admin/references/new")   
})

router.post("/references/save", adminAuth, (req, res) => {
    var title = req.body.title
    var author = req.body.author
    var link = req.body.link

    Reference.create({
        title: title,
        author: author,
        link: link
    }).then(() =>{
        res.redirect("/admin/references")
    })
})

router.post("/references/delete", adminAuth, (req, res) => {
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            Reference.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/references")
            })
        } else{
            res.redirect("/admin/references")    
        }
    } else{
        res.redirect("/admin/references") 
    } 
})

router.get("/admin/references/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id
    if(isNaN(id)){
        res.redirect("/admin/references")
    }
    Reference.findByPk(id).then(reference => {
        if(reference != undefined){
            res.render("admin/references/edit", {reference: reference})    
        } else{
            res.redirect("/admin/references")
        }
    }).catch(erro => {
        res.redirect("/admin/references")
    })  
})

router.post("/references/update", adminAuth, (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var author = req.body.author
    var link = req.body.link

    Reference.update({title: title, author: author, link: link}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/references")   
    }).catch(err => {
        res.redirect("/")
    })
})

// router.get("/courses/page/:num", (req, res) => {
//     var page = req.params.num
//     var offset = 0
//     if(isNaN(page) || page == 1){
//         offset = 0
//     } else {
//         offset = (parseInt(page) -1) * 4
//     }

//     Course.findAndCountAll({
//         limit: 4,
//         offset: offset,
//         order: [
//             ['id', 'DESC']
//         ]
//     }).then(courses => {
//         var next;
//         if(offset + 4 >= courses.count){
//             next = false
//         } else {
//             next = true
//         }
//         var result = {
//             page: parseInt(page),
//             next: next,
//             courses : courses
//         }

//         Category.findAll().then(categories => {
//             res.render("admin/courses/page", {result: result, categories: categories})
//         })
//     })
// })
module.exports = router