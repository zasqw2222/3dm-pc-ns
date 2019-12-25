const cheerio = require('cheerio')
const getHTMLContext = require('../lib')


async function get(url, ctx) {
    let html = await getHTMLContext(url)
    let body = await returnBody(html)
    return body

}

let returnBody = async (html) => {
    let $ = cheerio.load(html)
    let button = $('.ips')
    if (button.length <= 0) {
        button = $('.share-des').text().split(':')
        let code = button[3].trim()
        let path = button[2].split('提取码')[0].trim()
        path = `https://${path}`
        return {
            path,
            code
        }

    }
    let text = button.find('#path').val()
    let code = button.find('#openurl').data().clipboardText
    return {
        path: text,
        code,
    }
}

exports.get = get

