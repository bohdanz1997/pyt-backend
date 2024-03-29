const Knex = require('knex')

/**
 * @param {Knex} knex
 */
exports.seed = async (knex) => {
  const insertIfNotExist = async (tableName, whereCondition, values) => {
    const rows = await knex.table(tableName).where(whereCondition)
    if (rows.length === 0) {
      await knex.table(tableName).insert(values)
    }
  }

  const groups = [{
    id: 1,
    name: 'Груди',
    color: '#00cc4c'
  }, {
    id: 2,
    name: 'Плечі',
    color: '#cc0381'
  }, {
    id: 3,
    name: 'Спина',
    color: '#0050cc'
  }, {
    id: 5,
    name: 'Ноги',
    color: '#7f14cc'
  }, {
    id: 6,
    name: 'Біцепс',
    color: '#cc5a00'
  }, {
    id: 7,
    name: 'Трицепс',
    color: '#c9cc00'
  }, {
    id: 8,
    name: 'Прес',
    color: '#555',
  }]

  const exercises = [
    { name: 'Жим штанги лежачи', groupId: 1 },
    { name: 'Жим гантелей лежачи', groupId: 1 },
    { name: 'Жим штанги головою вниз', groupId: 1 },
    { name: 'Жим штанги в наклоні', groupId: 1 },
    { name: 'Жим в тренажері з наклоном', groupId: 1 },
    { name: 'Пуловер лежачи з гантелею', groupId: 1 },
    { name: 'Розведення гантелей лежачи', groupId: 1 },
    { name: 'Віджимання від полу', groupId: 1 },
    { name: 'Бабочка', groupId: 1 },
    { name: 'Зведення рук в кросовері', groupId: 1 },
    { name: 'Віджимання на брусях', groupId: 1 },
    { name: 'Жим штанги стоячи', groupId: 2 },
    { name: 'Жим штанги сидячи', groupId: 2 },
    { name: 'Жим штанги зза голови стоячи', groupId: 2 },
    { name: 'Жим штанги зза голови сидячи', groupId: 2 },
    { name: 'Жим гантелей сидячи', groupId: 2 },
    { name: 'Жим гантелей стоячи', groupId: 2 },
    { name: 'Жим Арнольда', groupId: 2 },
    { name: 'Підйом штанги вузьким хватом', groupId: 2 },
    { name: 'Підйом штанги широким хватом', groupId: 2 },
    { name: 'Підйом гантелей перед собою', groupId: 2 },
    { name: 'Підйом гантелей через сторони стоячи', groupId: 2 },
    { name: 'Підйом гантелей через сторони сидячи', groupId: 2 },
    { name: 'Розведення рук назад в кросовері', groupId: 2 },
    { name: 'Розведення гантелей стоячи в наклоні', groupId: 2 },
    { name: 'Розведення гантелей на наклонній лавці на животі', groupId: 2 },
    { name: 'Підтягування широким хватом', groupId: 3 },
    { name: 'Підтягування оберненим хватом', groupId: 3 },
    { name: 'Підтягування прямим хватом', groupId: 3 },
    { name: 'Тяга верхнього блоку до грудей', groupId: 3 },
    { name: 'Тяга штанги в наклоні', groupId: 3 },
    { name: 'Тяга верхнього блоку за голову', groupId: 3 },
    { name: 'Тяга Т-грифу в наклоні', groupId: 3 },
    { name: 'Тяга гантелей лежачи на лавці на животі', groupId: 3 },
    { name: 'Тяга гантелей стоячи в наклоні', groupId: 3 },
    { name: 'Тяга одної гантелі в наклоні', groupId: 3 },
    { name: 'Тяга нижнього блоку', groupId: 3 },
    { name: 'Гіперекстензія', groupId: 3 },
    { name: 'Станова тяга', groupId: 3 },
    { name: 'Шраги з гантелями', groupId: 3 },
    { name: 'Шраги зі штангою', groupId: 3 },
    { name: 'Тяга за спиною', groupId: 3 },
    { name: 'Випади з гантелями', groupId: 5 },
    { name: 'Присідання в гакк-тренажері', groupId: 5 },
    { name: 'Присідання зі штангою', groupId: 5 },
    { name: 'Жим ногами в тренажері', groupId: 5 },
    { name: 'Розгинання ніг в тренажері', groupId: 5 },
    { name: 'Мертва тяга', groupId: 5 },
    { name: 'Згинання ніг в тренажері стоячи', groupId: 5 },
    { name: 'Згинання ніг в тренажері лежачи', groupId: 5 },
    { name: 'Підйом на ікри сидячи', groupId: 5 },
    { name: 'Підйом на носки стоячи', groupId: 5 },
    { name: 'Згинання рук зі штангою стоячи', groupId: 6 },
    { name: 'Згинання рук на лавці скота', groupId: 6 },
    { name: 'Згинання рук з гантелями на наклонній лавці', groupId: 6 },
    { name: 'Згинання рук з гантелями хватом "Молот"', groupId: 6 },
    { name: 'Згинання рук на нижньому блоці в кросовері', groupId: 6 },
    { name: 'Згинання рук з гантелями стоячи', groupId: 6 },
    { name: 'Згинання рук стоячи/сидячи у верхніх блоків', groupId: 6 },
    { name: 'Підтягування на біцепс', groupId: 6 },
    { name: 'Концентровані згинання на біцепс', groupId: 6 },
    { name: 'Французький жим лежачи', groupId: 7 },
    { name: 'Французький жим гантелями сидячи', groupId: 7 },
    { name: 'Французький жим стоячи зі штангою', groupId: 7 },
    { name: 'Жим одної гантелі з-за голови стоячи', groupId: 7 },
    { name: 'Розгинання рук на блоці стоячи', groupId: 7 },
    { name: 'Відведення руки з гантелею в наклоні', groupId: 7 },
    { name: 'Віджимання на брусях', groupId: 7 },
    { name: 'Оберенені віджимання', groupId: 7 },
    { name: 'Жим штанги вузьким хватом', groupId: 7 },
    { name: 'Згручування лежачи', groupId: 8 },
    { name: 'Планка', groupId: 8 },
    { name: 'Скручування на наклонній лавці', groupId: 8 },
    { name: 'Підйом ніг в упорі', groupId: 8 },
    { name: 'Підйом ніг у висі', groupId: 8 },
    { name: 'Наклони з гантелею в сторони стоячи', groupId: 8 },
    { name: 'Обернені скручування', groupId: 8 },
  ]

  await Promise.all(groups.map((group) =>
    insertIfNotExist('groups', { name: group.name }, group)
  ))

  await Promise.all(exercises.map((exercise) =>
    insertIfNotExist('exercises', { name: exercise.name }, exercise)
  ))
}
