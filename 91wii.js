const cheerio = require('cheerio')
const getHTMLContext = require('./lib')

module.exports = () => {
    return async (ctx, next) => {
        console.log()
        let data = await getHTMLContext('https://www.91wii.com/forum-125-1.html')
        let $ = cheerio.load(data)
        data = $('#threadlisttableid')
        console.log(data.length)
    }
}