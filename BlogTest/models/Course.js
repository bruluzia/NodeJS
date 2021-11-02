const Sequelize = require("sequelize")
const connection = require("../database/database")

const Course = connection.define('courses', {
    title:{
        type: Sequelize.STRING,
        allowNull: false 
    }, 
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    author : {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    }

})

Course.sync({force: true})

module.exports = Course