import '@lib/router-extensions'

import Koa from 'koa'
import logger from "koa-logger"
import cors from "@koa/cors"
import compress from "koa-compress"
import body from "koa-body"
import { rootRouter } from './routes'

const port = process.env.PORT

export const server = () => {
  const app = new Koa()

  app.use(cors())
  app.use(compress())
  app.use(body({
    parsedMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
  }))
  app.use(logger())

  app.use(rootRouter.routes())
  app.use(rootRouter.allowedMethods())

  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}
