const express = require("express")
const app = express()

//Estou dizendo para o Express usar o EJS como View Engine
app.set('view engine', 'ejs') 
app.use(express.static('public'))

app.get("/:nome/:lang", (req, res) =>  {
    var nome = req.params.nome
    var lang = req.params.lang
    var exibirMsg = false

    var produtos = [
        {nome: "Doritos", preco: "22.50", disponivel: true},
        {nome: "Coca-cola", preco: "7.50", disponivel: true},
        {nome: "Coca-Cola Zero", preco: "7.50", disponivel: false},
        {nome: "Monster ", preco: "8.50", disponivel: true},
        {nome: "Biscoito de povilho ", preco: 4.50, disponivel: false},
        {nome: "Guaraná", preco: "6.00", disponivel: true}
    ]
    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Robson ltda",
        funcionarios: 20,
        msg: exibirMsg, 
        produtos: produtos
    })
})

app.listen(8080,()=>{
    console.log("App rodando!")
})