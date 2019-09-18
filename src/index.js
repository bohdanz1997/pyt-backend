require("@babel/register")({ extensions: [".js", ".mjs"] })
require('module-alias/register')

const { knex } = require('./db')

;(async () => {
  try {
    require('./server').server()
  } catch (err) {
    console.log(err)
    await knex.destroy()
  }
})()
