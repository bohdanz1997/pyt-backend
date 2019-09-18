const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable().unique()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('users')
}
