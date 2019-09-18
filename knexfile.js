module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      port: process.env.DB_PORT,
      password: process.env.DB_PASS,
      charset: 'utf8'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './src/features/common/migrations'
    },
    seeds: {
      directory: './src/features/common/seeds'
    }
  },
}
