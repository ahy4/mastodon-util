const Router = require('koa-router')

module.exports = new Router({ prefix: '/api' })
  .get('/test', async (ctx) => {
    ctx.body = 'success /test'
  })
