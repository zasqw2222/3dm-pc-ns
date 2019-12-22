const cheerio = require('cheerio')
const getHTMLContext = require('./lib')
const dayjs = require('dayjs')


function getSteamHotGameList() {
    return async (ctx, next) => {
        // console.log(await getHTMLContext('https://store.steampowered.com/search/?os=win&filter=topsellers'))
        if (ctx.req.url === '/steam') {
            let body = await getHTMLContext('https://store.steampowered.com/search/?os=win&filter=topsellers')
            body = await set(body)
            await ctx.render('steam', { body })
        }


        await next()
    }
}


let set = async (data) => {
    let resultArray = []
    let $ = cheerio.load(data)
    let list = $('.search_result_row')
    for (let i = 0, len = list.length; i < len; i++) {
        let defaultUrl = list.eq(i).attr('href')
        let imgUrl = list.eq(i).find('.col img').attr('src')
        let title = list.eq(i).find('.responsive_search_name_combined .title').text()
        let date = list.eq(i).find('.responsive_search_name_combined .search_released').text()
        date = dayjs(date).format('YYYY年MM月DD日')
        let price = list.eq(i).find('.responsive_search_name_combined .search_price_discount_combined .search_price').text().trim().split(' ')
        if (price.length > 2) {
            price = price[2]
        } else {
            price = price[1]
        }

        resultArray.push({
            title,
            imgUrl,
            defaultUrl,
            price,
            date
        })
    }
    return resultArray
}


module.exports = getSteamHotGameList