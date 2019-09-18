import Ajv from 'ajv'
import { ValidationError } from '../errors'

export const ajv = new Ajv()

export const validate = (schema) => {
  const isValid = ajv.compile(schema)

  return (ctx, next) => {
    if (!isValid(ctx.request.body)) {
      console.error(ctx.request.body, isValid.errors)
      throw new ValidationError(isValid.errors)
    }
    return next()
  }
}
