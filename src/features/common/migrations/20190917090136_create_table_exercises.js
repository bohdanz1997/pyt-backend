const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('exercises', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()

    table.integer('groupId')
      .unsigned()
      .references('groups.id')
      .onDelete('cascade')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('exercises')
}
