import { CustomError, InternalServerError } from '../errors'

const STATUS_OK = 200
// const STATUS_NO_CONTENT = 204
// const STATUS_INTERNAL_SERVER_ERROR = 500
const STATUS_NOT_IMPLEMENTED = 501
const STATUS_BAD_REQUEST = 400

export const apiWrapper = () => async (ctx, next) => {
  ctx.status = STATUS_NOT_IMPLEMENTED

  const response = await new Promise((resolve) => {
    resolveMiddleware(ctx, next)
      .then((value) => resolve({
        ok: true,
        result: value,
        status: STATUS_OK,
      }))
      .catch((error) => {
        return resolve({
          ok: false,
          error: error.message || error.name || error,
          status: error.httpStatus || STATUS_BAD_REQUEST,
        })
      })
  })

  ctx.status = response.status
  ctx.body = response

  return response
}

const resolveMiddleware = async (ctx, next) => {
  try {
    return await next()
  } catch (error) {
    if (error instanceof CustomError) {
      throw error
    }
    ctx.app.emit('error', error, ctx)
    throw new InternalServerError(error)
  }
}
