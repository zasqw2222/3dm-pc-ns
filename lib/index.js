const superagent = require('superagent')



module.exports = async function getHTMLContext(url) {

    let data = await superagent.get(url)
    return data.text

}