const cheerio = require('cheerio')
const getHTMLContext = require('./lib')
function get3DmGameList() {
    return async (ctx, next) => {
        if (ctx.req.url === '/3dm') {

            let body = await getHTMLContext('https://bbs.3dmgame.com/forum.php?gid=441')
            body = await set(body)
            await ctx.render('3dm', { body })
        }
        await next()
    }

}

let set = async (data) => {
    let resultArray = []
    let $ = cheerio.load(data)
    let list = $('.fl_g')
    let baseUrl = 'https://bbs.3dmgame.com/'
    for (let i = 0, len = list.length; i < len; i++) {
        let imgUrl = baseUrl + list.eq(i).find('.fl_icn_g img').attr('src')
        let defaultUrl = baseUrl + list.eq(i).find('.fl_icn_g a').attr('href')
        let name = list.eq(i).find('dl dt a').text()
        let currentNum = list.eq(i).find('dl dt em').text()
        resultArray.push({
            name,
            imgUrl,
            defaultUrl,
            currentNum
        })
    }
    return resultArray
}



module.exports = get3DmGameList