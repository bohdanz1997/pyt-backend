import Router from 'koa-router'
import { auth, Exercise } from '@features/common'

/**
 * @param {Router} exercises
 */
export const exercisesApi = (exercises) => {
  exercises.get('/', auth(), () => Exercise.query())
}
