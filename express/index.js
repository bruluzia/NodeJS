const { application } = require("express")
const express = require("express") //Importando o express
const app = express() //Iniciando o express

app.get("/", function(req, res){ 
   res.send("<h1>Bem vindo!</h1>") 
})

app.get("/perfil", function(req, res){
    res.send("<h1>Bem vindo ao meu perfil!</h1>")
})

app.get("/ola/:nome?/:empresa?", function(req, res){
    var nome = req.params.nome
    var empresa = req.params.empresa

    if(!nome || nome == " "){
        res.send(`<h1>Olá</h1>`)
    } else if(!empresa){
        res.send(`<h1>Olá ${nome}</h1>`)
    } else {
        res.send(`<h1>Olá, a ${empresa} é do ${nome}!</h1`)
    }
})

app.listen(4000,function(erro){
    if(erro){
        console.log("Ocorreu um erro!")
    }else {
        console.log("Servidor iniciado com sucesso!")
    }
})