import Router from 'koa-router'
import { auth, validate } from '@features/common'
import {
  workoutCreate,
  workoutsGet,
  workoutGet,
  workoutAddExercise,
  workoutRemoveExercise,
  workoutCreateSet,
} from './commands'
import {
  createWorkoutSchema,
  workoutExerciseSchema,
  workoutSetSchema,
} from './schemas'

/**
 * @param {Router} workouts
 */
export const workoutsApi = (workouts) => {
  workouts.use(auth())

  workouts.post('/', validate(createWorkoutSchema), create)
  workouts.get('/', list)

  workouts.group('/:workoutId/exercises', (exercises) => {
    exercises.post('/', validate(workoutExerciseSchema), attachExercise)
    exercises.del('/', validate(workoutExerciseSchema), detachExercise)
  })

  workouts.group('/:workoutId/sets', (sets) => {
    sets.post('/', validate(workoutSetSchema), createSet)
    sets.get('/', listSets)
    sets.put('/', validate(workoutSetSchema), updateSet)
    sets.del('/', removeSet)
  })
}

const create = (ctx) => workoutCreate(ctx.user, ctx.request.body)
const list = (ctx) => workoutsGet(ctx.user)

const attachExercise = (ctx) => {
  const id = Number(ctx.params.workoutId)
  const { exerciseId } = ctx.request.body
  return workoutAddExercise(ctx.user, id, exerciseId)
    .then(() => workoutGet(ctx.user, id))
}

const detachExercise = (ctx) => {
  const id = Number(ctx.params.workoutId)
  const { exerciseId } = ctx.request.body
  return workoutRemoveExercise(ctx.user, id, exerciseId)
    .then(() => workoutGet(ctx.user, id))
}

const createSet = (ctx) => {
  const id = Number(ctx.params.workoutId)
  return workoutCreateSet(ctx.user, id, ctx.request.body)
}

const updateSet = (ctx) => {
  const id = Number(ctx.params.workoutId)
  const body = ctx.request.body
}

const listSets = (ctx) => {
  const id = Number(ctx.params.workoutId)
}

const removeSet = (ctx) => {
  const id = Number(ctx.params.workoutId)
}
