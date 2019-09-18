import Router from 'koa-router'

/**
 * @param {string} path
 * @param {function(Router)} cb
 */
Router.prototype.group = function (path, cb) {
  const child = new Router()
  child.prefix(path)
  cb(child)
  this.use(child.routes())
}
