import { Template, Workout, Set, CustomError, NotFoundError } from '@features/common'
import { expandQuery, expandQueryOne } from '@lib/repository'

const expandOptions = {
  exercises: 'id',
  sets: 'id',
}

export const workoutCreate = async (user, workoutData) => {
  const { templateId, date } = workoutData

  const template = await Template.query().where({
    id: templateId,
    userId: user.id,
  }).first()

  if (!template) {
    throw new CustomError('template_not_found')
  }

  const workoutsForCurrentDate = await Workout.query()
    .whereRaw(`datediff(${`'${date}'` || 'now()'}, createdAt) = 0`)
    .andWhere('userId', user.id)

  if (workoutsForCurrentDate.length > 0) {
    throw new CustomError('workout_already_created')
  }

  const workout = await Workout.query().insertAndFetch({
    userId: user.id,
    createdAt: date ? new Date(date): undefined,
  })

  const exercises = await template.$relatedQuery('exercises')
  await Promise.all(exercises.map((exercise) =>
    workout.$relatedQuery('exercises').relate(exercise.id)
  ))

  return expandQueryOne(
    Workout.query().findById(workout.id),
    expandOptions,
  )
}

export const workoutsGet = async (user) => {
  const userId = user.id
  const results = await expandQuery({
    query: Workout.query().where({ userId }),
    expand: expandOptions,
  })
  return results
}

export const workoutGet = async (user, id) => {
  const userId = user.id
  const results = await expandQuery({
    query: Workout.query().where({ userId, id }),
    expand: expandOptions,
  })
  return results[0]
}

export const workoutAddExercise = async (user, workoutId, exerciseId) => {
  const workout = await Workout.query().findById(workoutId)
  if (!workout) {
    throw new NotFoundError('workout_not_found')
  }

  const existExercises = await workout
    .$relatedQuery('exercises')
    .where({ exerciseId })

  if (existExercises.length > 0) {
    throw new CustomError('exercise_already_added')
  }

  await workout.$relatedQuery('exercises').relate(exerciseId)
  return true
}

export const workoutRemoveExercise = async (user, workoutId, exerciseId) => {
  const workout = await Workout.query().findById(workoutId)
  if (!workout) {
    throw new NotFoundError('workout_not_found')
  }

  await workout
    .$relatedQuery('exercises')
    .unrelate()
    .where({ exerciseId })
  return true
}

export const workoutCreateSet = async (user, workoutId, setData) => {
  const workout = await Workout.query().findById(workoutId)
  if (!workout) {
    throw new NotFoundError('workout_not_found')
  }

  const foundExercises = await workout
    .$relatedQuery('exercises')
    .where({ id: setData.exerciseId })

  if (foundExercises.length === 0) {
    throw new CustomError('exercise_not_added')
  }

  const set = await workout
    .$relatedQuery('sets')
    .insertAndFetch(setData)

  return set
}

export const workoutUpdateSet = async (user, workoutId, setId, setData) => {
  const set = await Set
    .query()
    .patchAndFetchById(setId, {
      reps: setData.reps,
      weight: setData.weight,
      comment: setData.comment,
      position: setData.position,
    })

  return set
}

export const setsGet = async (user, workoutId) => {
  const workout = await Workout.query().findById(workoutId)
  if (!workout) {
    throw new NotFoundError('workout_not_found')
  }
  return workout.$relatedQuery('sets')
}

export const setRemove = async (workoutId, setId) => {
  const workout = await Workout.query().findById(workoutId)
  if (!workout) {
    throw new NotFoundError('workout_not_found')
  }
  await workout.$relatedQuery('sets').deleteById(setId)
  return true
}
