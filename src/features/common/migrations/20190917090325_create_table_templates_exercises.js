const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('templates_exercises', (table) => {
    table.integer('templateId')
      .unsigned()
      .notNullable()
      .references('templates.id')
      .onDelete('cascade')

    table.integer('exerciseId')
      .unsigned()
      .notNullable()
      .references('exercises.id')
      .onDelete('cascade')
  })
}

/**
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('templates_exercises')
}
