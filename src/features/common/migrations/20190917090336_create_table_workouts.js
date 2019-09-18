const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('workouts', (table) => {
    table.increments('id').primary()

    table.integer('userId')
      .unsigned()
      .references('users.id')
      .onDelete('cascade')

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('workouts')
}
