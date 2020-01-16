const cheerio = require('cheerio')
const getHTMLContext = require('./lib')


function getFunction() {
    return async (ctx, next) => {

        if (ctx.req.url === '/music_') {
            let body = await getHTMLContext('https://music.163.com/')
            body = await set(body)
            await ctx.render('music_', { body })
        }

        await next()
    }
}

let set = async (body) => {
    let $ = cheerio.load(body)
    let listItem = $('.m-cvrlist').find('li')
    console.log('这这这----------', listItem);

    let resultArray = []
    for (let i = 0, len = listItem.length; i < len; i++) {
        let imgUrl = listItem.eq(i).find('img').attr('src')
        let name = listItem.eq(i).find('.msk').text()

        resultArray.push({
            imgUrl,
            name,
        })
    }
    console.log('到了这里了----------', resultArray);

    return resultArray
}



module.exports = getFunction