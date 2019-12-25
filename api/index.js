const open = require('open')
let { get } = require('../api/getBaidu')
// const util = require('util');


module.exports = () => {
    return async (ctx, next) => {
        if (ctx.path === '/api/getbaiduurl') {
            let { url } = ctx.query
            let p = await get(url)
            ctx.header = {
                ' content-type': 'application/json; charset=UTF-8'
            }
            ctx.body = p
        }

        await next()
    }
}