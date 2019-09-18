import { Model } from "objection"
import { User } from './user'
import { Set } from './set'
import { Exercise } from './exercise'

export class Workout extends Model {
  static get tableName() {
    return 'workouts'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'workouts.userId'
        }
      },
      exercises: {
        relation: Model.ManyToManyRelation,
        modelClass: Exercise,
        join: {
          from: 'workouts.id',
          to: 'exercises.id',
          through: {
            from: 'workouts_exercises.workoutId',
            to: 'workouts_exercises.exerciseId',
          },
        }
      },
      sets: {
        relation: Model.ManyToManyRelation,
        modelClass: Set,
        join: {
          from: 'workouts.id',
          to: 'sets.id',
          through: {
            from: 'workouts_sets.workoutId',
            to: 'workouts_sets.setId',
          },
        }
      }
    }
  }
}
