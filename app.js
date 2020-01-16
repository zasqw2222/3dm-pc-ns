const Koa = require('koa')
const render = require('koa-ejs')
const app = new Koa()
const json = require('koa-json')
const path = require('path')

const static = require('koa-static')
const open = require('open')



const get = require('./get')
const get3Dm = require('./getTDm')
const getHome = require('./getHome')
const getMovies = require('./movies')
const getSteamHotGameList = require('./getSteam')
const getMusic = require('./getMusic')
const getMusic_ = require('./getMusic_')
const wii = require('./91wii')
const api = require('./api')

app.use(static(
    path.join(__dirname, 'view')
))

render(app, {
    root: path.join(__dirname, 'view'),
    layout: 'template',
    viewExt: 'html',
    cache: false,
    debug: true
})
app.use(json())
app.use(getHome())

app.use(get())

app.use(get3Dm())

app.use(getMovies())

app.use(getSteamHotGameList())

app.use(getMusic())

app.use(getMusic_())
app.use(api())

app.listen(3000, () => {
    open('http://127.0.0.1:3000')
})