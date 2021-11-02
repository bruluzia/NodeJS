const express = require("express")
const router = express.Router()
const Course = require("./Course")
const slugify = require("slugify")
const adminAuth = require("../middlewares/adminAuth")

router.get("/admin/courses", adminAuth, (req, res) =>{
    Course.findAll().then(courses =>{
        res.render("admin/courses/index", {courses: courses})
    })       
})

router.get("/admin/courses/new", adminAuth, (req, res) => {
    res.render("admin/courses/new")   
})

router.post("/courses/save", adminAuth, (req, res) => {
    var title = req.body.title
    var body = req.body.body
    var author = req.body.author

    Course.create({
        title: title,
        slug: slugify(title),
        body: body,
        author: author
    }).then(() =>{
        res.redirect("/admin/courses")
    })
})

router.post("/courses/delete", adminAuth, (req, res) => {
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){
            Course.destroy({
                where:{
                    id: id
                }
            }).then(() => {
                res.redirect("/admin/courses")
            })
        } else{
            res.redirect("/admin/courses")    
        }
    } else{
        res.redirect("/admin/courses") 
    } 
})

router.get("/admin/courses/edit/:id", adminAuth, (req, res) => {
    var id = req.params.id
    if(isNaN(id)){
        res.redirect("/admin/courses")
    }
    Course.findByPk(id).then(course => {
        if(course != undefined){
            res.render("admin/courses/edit", {course: course})    
        } else{
            res.redirect("/admin/courses")
        }
    }).catch(erro => {
        res.redirect("/admin/courses")
    })  
})

router.post("/courses/update", adminAuth, (req, res) => {
    var id = req.body.id
    var title = req.body.title
    var body = req.body.body
    var author = req.body.author

    Course.update({title: title, body: body, author: author, slug: slugify(title)}, {
        where: {
            id: id
        }
    }).then(() => {
        res.redirect("/admin/courses")   
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