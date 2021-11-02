const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const session = require("express-session")
const connection = require("./database/database")
const path = require('path')

const categoriesController = require("./controllers/CategoriesController")
const articlesController = require("./controllers/ArticlesController")
const usersController = require("./controllers/UsersController")
const coursesController = require("./controllers/CoursesController")
const referencesController = require("./controllers/ReferencesController")

const Article = require("./models/Article")
const Category = require("./models/Category")
const User = require("./models/User")
const Course = require("./models/Course")
const Reference = require("./models/Reference")


app.use(session({
    secret: "kkk2ndao2mdadni223nn08954jn", cookie: {maxAge: 300000}
}))

// View engine
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "./client"))

// Static
app.use(express.static('public'))

//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Database
connection
    .authenticate()
    .then(() => {
        console.log("Connection made successfully")    
    }).catch((error) => {
        console.log(error)
    })


//Routes
app.use("/", categoriesController)
app.use("/", articlesController)
app.use("/", usersController)
app.use("/", coursesController)
app.use("/", referencesController)

app.get("/session", (req, res) =>{

})

app.get("/read", (req, res) =>{
    
})

app.get("/", (req, res) => {
    Article.findAll({
        order: [
            ['id', 'DESC']
        ], 
        limit: 4
    }).then(articles => {
        Category.findAll().then(categories => {
            res.render("index", {articles: articles, categories: categories, session: session})
        })   
    })
})

app.get("/:slug", (req, res) => {
    var slug = req.params.slug
    Article.findOne({
        where: {
            slug: slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article: article, categories: categories, session: session})
            })
        } else {
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect("/")
    })
})

app.get("/category/:slug", (req, res) => {
    var slug = req.params.slug
    Category.findOne({
        where: {
            slug: slug    
        }, 
        include: [{model: Article}]
    }).then(category => {
        if(category != undefined){
            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories, session: session})
            })
        } else{
            res.redirect("/")
        }
    }).catch(err => {
        res.redirect("/")
    })
})

app.listen(8080, () => {
    console.log("The server is running")
})