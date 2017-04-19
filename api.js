const Router = require('koa-router')
const Mastodon = require('mastodon-api')
console.log('ACCESS_TOKEN: ', process.env.ACCESS_TOKEN)
const M = new Mastodon({ access_token: process.env.ACCESS_TOKEN })

module.exports = new Router({ prefix: '/api' })
  .get('/toots', async (ctx) => {
    const {data} = await M.get('timelines/public', {})
    ctx.body = data
  })
