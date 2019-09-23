import { Template } from '@features/common'
import { expandQuery, expandQueryOne } from '@lib/repository'

const expandOptions = {
  exercises: 'id'
}

export const templateCreate = async (user, templateData) => {
  const template = await Template.query().insert({
    name: templateData.name,
    description: templateData.description,
    position: templateData.position,
    userId: user.id,
  })

  const exIds = templateData.exercises || []
  await Promise.all(exIds.map((exId) =>
    template.$relatedQuery('exercises').relate(exId)
  ))

  return expandQueryOne(
    Template.query().findById(template.id),
    expandOptions,
  )
}

export const templatesGet = async (user, body) => {
  const userId = user.id
  const results = await expandQuery({
    query: Template.query().where({ userId }),
    expand: expandOptions,
  })
  return results
}

export const templateRemove = async (id) => {
  await Template.query().deleteById(id)
  return Number(id)
}
