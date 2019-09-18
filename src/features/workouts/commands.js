import { Template, Workout } from '@features/common'
import { expandQuery } from '@lib/repository'
import { CustomError } from '@features/common/errors'

export const workoutCreate = async (user, workoutData) => {
  const { templateId } = workoutData

  const template = await Template.query().findById(templateId)
  const exercises = await template.$relatedQuery('exercises')

  const workout = await Workout.query().insertAndFetch({
    userId: user.id,
  })

  await Promise.all(exercises.map((exercise) =>
    workout.$relatedQuery('exercises').relate(exercise.id)
  ))

  return workout
}

export const workoutsGet = async (user) => {
  const userId = user.id
  const results = await expandQuery({
    query: Workout.query().where({ userId }),
    expand: {
      exercises: 'id',
      sets: 'id',
    },
  })
  return results
}

export const workoutGet = async (user, id) => {
  const userId = user.id
  const results = await expandQuery({
    query: Workout.query().where({ userId, id }),
    expand: {
      exercises: 'id',
      sets: 'id',
    },
  })
  return results[0]
}

export const workoutAddExercise = async (user, workoutId, exerciseId) => {
  const workout = await Workout.query().findById(workoutId)

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
  await workout
    .$relatedQuery('exercises')
    .unrelate()
    .where({ exerciseId })
  return true
}

export const workoutCreateSet = async (user, workoutId, setData) => {
  const workout = await Workout.query().findById(workoutId)

  const foundExercises = await workout
    .$relatedQuery('exercises')
    .where({ id: setData.exerciseId })

  if (foundExercises.length === 0) {
    throw new CustomError('exercise_not_added')
  }

  const set = await workout
    .$relatedQuery('sets')
    .insertAndFetch({
      reps: setData.reps,
      weight: setData.weight,
      comment: setData.comment,
      position: setData.position,
      exerciseId: setData.exerciseId,
    })

  return set
}
