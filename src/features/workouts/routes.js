import Router from 'koa-router'
import { auth, validate } from '@features/common'
import {
  workoutCreate,
  workoutsGet,
  workoutGet,
  workoutAddExercise,
  workoutRemoveExercise,
  workoutCreateSet,
  workoutUpdateSet,
  setsGet,
  setRemove,
  workoutRemove,
} from './commands'
import {
  createWorkoutSchema,
  workoutExerciseSchema,
  createSetSchema,
  updateSetSchema,
} from './schemas'

/**
 * @param {Router} workouts
 */
export const workoutsApi = (workouts) => {
  workouts.use(auth())

  workouts.post('/', validate(createWorkoutSchema), create)
  workouts.get('/', list)
  workouts.del('/:workoutId', remove)

  workouts.group('/:workoutId/exercises', (exercises) => {
    exercises.post('/', validate(workoutExerciseSchema), attachExercise)
    exercises.del('/', validate(workoutExerciseSchema), detachExercise)
  })

  workouts.group('/:workoutId/sets', (sets) => {
    sets.post('/', validate(createSetSchema), createSet)
    sets.get('/', listSets)
    sets.put('/:setId', validate(updateSetSchema), updateSet)
    sets.del('/:setId', removeSet)
  })
}

const create = (ctx) => workoutCreate(ctx.user, ctx.request.body)
const list = (ctx) => workoutsGet(ctx.user)
const remove = (ctx) => workoutRemove(ctx.params.workoutId)

const attachExercise = (ctx) => {
  const { workoutId } = ctx.params
  const { exerciseId } = ctx.request.body
  return workoutAddExercise(ctx.user, workoutId, exerciseId)
    .then(() => workoutGet(ctx.user, workoutId))
}

const detachExercise = (ctx) => {
  const { workoutId } = ctx.params
  const { exerciseId } = ctx.request.body
  return workoutRemoveExercise(ctx.user, workoutId, exerciseId)
    .then(() => workoutGet(ctx.user, workoutId))
}

const createSet = (ctx) => {
  const { workoutId } = ctx.params
  return workoutCreateSet(ctx.user, workoutId, ctx.request.body)
}

const updateSet = (ctx) => {
  const { workoutId, setId } = ctx.params
  return workoutUpdateSet(ctx.user, workoutId, setId, ctx.request.body)
}

const listSets = (ctx) => {
  const { workoutId } = ctx.params
  return setsGet(ctx.user, workoutId)
}

const removeSet = (ctx) => {
  const { workoutId, setId } = ctx.params
  return setRemove(workoutId, setId)
}
