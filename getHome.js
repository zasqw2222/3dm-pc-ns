module.exports = () => {
    return async (ctx, next) => {

        if (ctx.req.url === '/') {
            await ctx.render('home')
        }


        await next()
    }
}