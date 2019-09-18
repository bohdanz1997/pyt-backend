const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('workouts_exercises', (table) => {
    table.integer('workoutId')
      .unsigned()
      .notNullable()
      .references('workouts.id')
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
  await knex.schema.dropTable('workouts_exercises')
}
