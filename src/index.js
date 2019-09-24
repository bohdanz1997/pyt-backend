require("@babel/register")({ extensions: [".js", ".mjs"] })
require('module-alias/register')

const { knex } = require('./db')

if (process.env.NODE_ENV === 'production') {
  require('dotenv').config()
}


const main = async () => {
  try {
    require('./server').server()
  } catch (err) {
    console.log(err)
    await knex.destroy()
  }
}
main()
