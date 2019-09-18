const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('tokens', (table) => {
    table.increments('id').primary()
    table.string('token')
    table.integer('userId')
      .unsigned()
      .references('users.id')
      .onDelete('cascade')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('tokens')
}
