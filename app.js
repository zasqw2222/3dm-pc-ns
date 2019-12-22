const Koa = require('koa')
const render = require('koa-ejs')
const app = new Koa()
const path = require('path')

const static = require('koa-static')
const open = require('open')
const get = require('./get')
const get3Dm = require('./getTDm')
const getHome = require('./getHome')
const getMovies = require('./movies')
const getSteamHotGameList = require('./getSteam')
const wii = require('./91wii')
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

app.use(getHome())

app.use(get())

app.use(get3Dm())

app.use(getMovies())

app.use(getSteamHotGameList())

// app.use(wii())

app.listen(3000, () => {
    // open('http://127.0.0.1:3000')
})