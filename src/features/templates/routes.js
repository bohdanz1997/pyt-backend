import Router from 'koa-router'
import { auth, validate } from '@features/common'
import { templateCreateSchema } from './schemas'
import { templateCreate, templateRemove, templatesGet } from './commands'

/**
 * @param {Router} templates
 */
export const templatesApi = (templates) => {
  templates.post('/', auth(), validate(templateCreateSchema), create)
  templates.get('/', auth(), list)
  templates.del('/:templateId', auth(), remove)
}

const create = (ctx) => templateCreate(ctx.user, ctx.request.body)
const list = (ctx) => templatesGet(ctx.user, ctx.request.body)
const remove = (ctx) => templateRemove(Number(ctx.params.templateId))
