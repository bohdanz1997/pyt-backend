const npm_package = require('./package.json')

module.exports = {
  resolve: {
    root: __dirname,
    alias: npm_package._moduleAliases || {},
  }
}
