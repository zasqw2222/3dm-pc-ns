
const cheerio = require('cheerio')
const getHTMLContext = require('./lib')


/**
 * 解析Ns游戏
 * @param {} data 
 */
function setMessage(data) {
    let host = `https://www.bibgame.com`
    let text = cheerio.load(data)
    let news = text('.news')
    let resultArr = []
    for (let i = 0, len = news.length; i < len; i++) {
        let imgUri = host + news.eq(i).find('.img_box a img').attr('src')
        let langType = news.eq(i).find('.info_box .vg_tab').text()
        let defaultUrl = host + news.eq(i).find('.info_box a').attr('href')
        let name = news.eq(i).find('.info_box a').text()
        resultArr.push({
            name,
            imgUri,
            langType,
            defaultUrl
        })
    }
    return resultArr
}








module.exports = function () {
    return async (ctx, next) => {
        if (ctx.req.url === '/game') {
            let body = ''
            let pcBody = ''
            try {
                body = await getHTMLContext("https://www.bibgame.com/sgame/")
                pcBody = await getHTMLContext("https://www.bibgame.com/pcgame/pccn/")
               
            } catch (error) {
                body = error
            }
            body = setMessage(body)
            pcBody = setMessage(pcBody)
            await ctx.render('list', { body, pcBody })
        }
        await next()
    }



}