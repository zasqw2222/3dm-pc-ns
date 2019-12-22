const getHTMLContext = require('./lib')
const cheerio = require('cheerio')
module.exports = () => {
    return async (ctx, next) => {
        if (ctx.req.url === '/movies') {
            let movies = await getHTMLContext("https://www.bd-film.cc/movies/index.htm")
            movies = setMovies(movies)
            await ctx.render('movies', {movies})
        }

        await next()
    }
}


function setMovies(data) {
    let text = cheerio.load(data)
    let news = text('.col-sm-3')
    let resultArr = []
    for (let i = 0, len = news.length; i < len; i++) {
        let title = news.eq(i).find('.title h5 a').text()
        // 
        let subtitle = news.eq(i).find('.subtitle').text()

        let imgUrl = news.eq(i).find('.videopic img').attr('src')
        let sourceUrl = news.eq(i).find('.videopic').attr('href')
        resultArr.push({
            title,
            subtitle,
            imgUrl,
            sourceUrl
        })
    }
    return resultArr
}