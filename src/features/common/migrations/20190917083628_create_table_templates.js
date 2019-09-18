const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('templates', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('description')
    table.integer('position').defaultTo(0)

    table.integer('userId')
      .unsigned()
      .references('users.id')
      .onDelete('set null')

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('templates')
}
