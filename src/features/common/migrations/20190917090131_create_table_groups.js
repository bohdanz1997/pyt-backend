const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('groups', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('color').notNullable()
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('groups')
}
