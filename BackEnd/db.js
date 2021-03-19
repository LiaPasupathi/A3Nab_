var db = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.dbHost,
      user: process.env.dbUsername,
      password: process.env.dbPassword,
      database: process.env.dbName
    }
  })
  module.exports = db