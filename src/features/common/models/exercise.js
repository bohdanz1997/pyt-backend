import { Model } from "objection"
import { Group } from './group'

export class Exercise extends Model {
  static get tableName() {
    return 'exercises'
  }

  static get relationMappings() {
    return {
      group: {
        relation: Model.BelongsToOneRelation,
        modelClass: Group,
        join: {
          from: 'groups.id',
          to: 'exercises.groupId'
        }
      }
    }
  }
}
