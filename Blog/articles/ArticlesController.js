const express = require("express")
const router = express.Router()

router.get("/articles", (req, res) => {
   res.send("Article route") 
})

router.get("/admin/article/new", (req, res) =>{
    res.send("Route to build a new article")    
})

module.exports = router