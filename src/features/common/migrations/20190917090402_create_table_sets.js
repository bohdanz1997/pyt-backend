const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('sets', (table) => {
    table.increments('id').primary()
    table.integer('reps')
    table.decimal('weight')
    table.string('comment')
    table.integer('position')

    table.integer('exerciseId')
      .unsigned()
      .references('exercises.id')
      .onDelete('cascade')

    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('sets')
}
