import Router from 'koa-router'
import { auth, Group } from '@features/common'

/**
 * @param {Router} groups
 */
export const groupsApi = (groups) => {
  groups.use(auth())
  groups.get('/', () => Group.query())
}
