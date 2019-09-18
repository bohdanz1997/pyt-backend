import { userGet } from '@features/users/commands'
import { AuthorizationError } from '@features/common/errors'

const MIN_TOKEN_LENGTH = 10

export const auth = () => async (ctx, next) => {
  if (ctx.request.header.authorization) {
    const [word, token] = ctx.request.header.authorization.split(' ')

    if (word === 'bearer' && token && token.length > MIN_TOKEN_LENGTH) {
      try {
        const foundUser = await userGet(token)
        ctx.user = foundUser
        ctx.auth = { token }
        return next()
      } catch (error) {
        if (error.message === 'invalid_token') {
          throw new AuthorizationError(error.message)
        }
        throw error
      }
    }
  }

  throw new AuthorizationError()
}
