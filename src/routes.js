import Router from 'koa-router'
import { groupsApi } from '@features/groups'
import { exercisesApi } from '@features/exercises'
import { usersApi } from '@features/users'
import { templatesApi } from '@features/templates'
import { workoutsApi } from '@features/workouts'

export const rootRouter = new Router()

rootRouter.group('/api', (api) => {
  api.group('/groups', groupsApi)
  api.group('/exercises', exercisesApi)
  api.group('/users', usersApi)
  api.group('/templates', templatesApi)
  api.group('/workouts', workoutsApi)
})
