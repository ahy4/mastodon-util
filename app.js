var Koa = require('koa')
var app = new Koa()
var Nuxt = require('nuxt')
var router = require('./api')

var config = require('./nuxt.config.js')
config.dev = !(app.env === 'production')

var nuxt = new Nuxt(config)

// Build only in dev mode
if (config.dev) {
  nuxt.build().catch((error) => {
    console.error(error) // eslint-disable-line no-console
    process.exit(1)
  })
}

app
  .use(async (ctx, next) => {
    const isApi = ctx.url.match(/^\/api\//)
    if (isApi) {
      await next()
    } else {
      ctx.status = 200 // koa defaults to 404 when it sees that status is unset
      await nuxt.render(ctx.req, ctx.res)
    }
  })
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
