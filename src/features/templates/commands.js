import { Template } from '@features/common'
import { expandQuery } from '@lib/repository'

export const templateCreate = async (user, templateData) => {
  const template = await Template.query().insertAndFetch({
    name: templateData.name,
    description: templateData.description,
    position: templateData.position,
    userId: user.id,
  })

  const exIds = templateData.exercises || []
  await Promise.all(exIds.map((exId) =>
    template.$relatedQuery('exercises').relate(exId)
  ))

  return template
}

export const templatesGet = async (user, body) => {
  const userId = user.id
  const results = await expandQuery({
    query: Template.query().where({ userId }),
    expand: {
      exercises: 'id'
    },
  })
  return results
}

export const templateRemove = async (id) => {
  await Template.query().deleteById(id)
  return true
}
