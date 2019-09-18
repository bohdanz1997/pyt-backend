const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  await knex.table('exercises').del()
  await knex.table('groups').del()

  // Inserts seed entries
  await knex.table('groups').insert([
    {id: 1, name: 'Груди', color: '#00cc4c'},
    {id: 2, name: 'Спина', color: '#0050cc'},
    {id: 3, name: 'Ноги', color: '#7f14cc'},
    {id: 4, name: 'Плечі', color: '#cc0381'},
    {id: 5, name: 'Біцепс', color: '#cc5a00'},
    {id: 6, name: 'Трицепс', color: '#c9cc00'},
  ])

  await knex.table('exercises').insert([
    {name: 'Жим штанги лежачи', groupId: 1},
    {name: 'Жим гантелей лежачи', groupId: 1},
    {name: 'Розведення гантелей', groupId: 1},

    {name: 'Підтягування на турніку', groupId: 2},
    {name: 'Тяга штанги в наклоні', groupId: 2},
    {name: 'Гозизонтальна тяга в тренажері', groupId: 2},

    {name: 'Присідання зі штангою', groupId: 3},
    {name: 'Жим ногами', groupId: 3},
    {name: 'Розгинання ніг на тренажері', groupId: 3},
  ])
}
