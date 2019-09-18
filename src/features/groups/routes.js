import Router from 'koa-router'
import { auth, Group } from '@features/common'

/**
 * @param {Router} groups
 */
export const groupsApi = (groups) => {
  groups.get('/', auth(), () => Group.query())
}
