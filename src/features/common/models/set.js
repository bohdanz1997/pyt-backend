import { Model } from "objection"
import { Exercise } from './exercise'

export class Set extends Model {
  static get tableName() {
    return 'sets'
  }

  static get relationMappings() {
    return {
      exercise: {
        relation: Model.BelongsToOneRelation,
        modelClass: Exercise,
        join: {
          from: 'exercises.id',
          to: 'sets.exerciseId'
        }
      }
    }
  }
}
