import { Model } from "objection"
import { User } from './user'

export class Token extends Model {
  static get tableName() {
    return 'tokens'
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          to: 'tokens.userId'
        }
      }
    }
  }
}
