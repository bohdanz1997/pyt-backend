export const createWorkoutSchema = {
  properties: {
    templateId: { type: 'integer' },
  },
  required: ['templateId'],
}

export const workoutExerciseSchema = {
  properties: {
    exerciseId: { type: 'integer' },
  },
  required: ['exerciseId'],
}

export const workoutSetSchema = {
  properties: {
    reps: { type: 'integer' },
    weight: { type: 'number' },
    comment: { type: 'string' },
    position: { type: 'integer' },
    exerciseId: { type: 'integer' },
  },
}

export const createSetSchema = {
  ...workoutSetSchema,
  required: ['exerciseId', 'reps', 'weight'],
}

export const updateSetSchema = {
  ...workoutSetSchema,
}
