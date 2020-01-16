const cheerio = require('cheerio')
const getHTMLContext = require('../lib')


function getFunction() {
    return async (ctx, next) => {

        if (ctx.req.url === '/music') {
            let body = await getHTMLContext('https://www.sq688.com/share/1.html')
            body = await set(body)
            await ctx.render('music', { body })
        }

        await next()
    }
}

let set = async (body) => {
    let $ = cheerio.load(body)
    let listItem = $('.items')
    console.log('哈哈哈哈哈', listItem);
    let baseUrl = 'https://www.sq688.com'
    let resultArray = []
    for (let i = 0, len = listItem.length; i < len; i++) {
        let defaultURL = baseUrl + listItem.eq(i).find('.i-info a').attr('href')
        let name = listItem.eq(i).find('.i-info h1').text()
        let date = listItem.eq(i).find('.i-info .i-date').text()

        resultArray.push({
            name,
            date,
            defaultURL,
        })
    }

    return resultArray
}



module.exports = getFunction