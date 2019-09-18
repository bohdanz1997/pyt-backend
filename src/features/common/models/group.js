import { Model } from "objection"

export class Group extends Model {
  static get tableName() {
    return 'groups'
  }
}
