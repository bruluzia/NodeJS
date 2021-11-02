const Sequelize = require("sequelize")
const connection = require("../database/database")

const Reference = connection.define('references', {
    title:{
        type: Sequelize.STRING,
        allowNull: false 
    }, 
    author : {
        type: Sequelize.STRING,
        allowNull: false
    },
    link: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Reference