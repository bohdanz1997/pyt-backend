import { Model } from "objection"
import { User } from './user'
import { Exercise } from './exercise'

export class Template extends Model {
  static get tableName() {
    return 'templates'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'templates.userId'
        }
      },
      exercises: {
        relation: Model.ManyToManyRelation,
        modelClass: Exercise,
        join: {
          from: 'templates.id',
          to: 'exercises.id',
          through: {
            from: 'templates_exercises.templateId',
            to: 'templates_exercises.exerciseId',
          },
        }
      }
    }
  }
}
