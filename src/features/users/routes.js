import Router from 'koa-router'
import { auth, validate } from '@features/common'
import { sessionCreateSchema, authSchema, sessionDropSchema } from './schemas'
import { userRegister, userLogin, userSessionDrop } from './commands'

/**
 * @param {Router} users
 */
export const usersApi = (users) => {
  users.post('/', validate(authSchema), register)

  users.group('/session', (session) => {
    session.post('/', validate(sessionCreateSchema), login)
    session.get('/', auth(), me)
    session.del('/', auth(), validate(sessionDropSchema), drop)
  })
}

const login = (ctx) => userLogin(ctx.request.body)
const register = (ctx) => userRegister(ctx.request.body)
const drop = (ctx) => userSessionDrop(ctx.user, ctx.request.body.token)
const me = (ctx) => ({
  ...ctx.user,
  token: ctx.auth.token,
})

