//console.log("Hello World!")
var a = 30
var b = 5
var calculadora = require("./calculadora")

console.log(`Valores: ${a} e ${b}`)
console.log(`Soma: ${calculadora.soma(a, b)}`)
console.log(`Subtração: ${calculadora.sub(a, b)}`)
console.log(`Multiplicação: ${calculadora.mult(a, b)}`)
console.log(`Divisão: ${calculadora.div(a, b)}`)
