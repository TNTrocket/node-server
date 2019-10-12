import express from 'express'
import router from './routes/index'
import chalk from 'chalk'
import session from 'express-session'
import connectMongo from 'connect-mongo'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import './mongodb/db.js'

const app = express()


const MongoStore = connectMongo(session)

app.use(session({
    name: 'SID',
    secret: 'SID',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 100 * 1000,
    }
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use((req, res, next) => {
    req.cookies.SID = req.cookies.SID.slice(2, req.cookies.SID.indexOf('.'))
    next()
})
router(app)
app.listen(8080, () => {
    console.log(
        chalk.green(`成功监听端口：8080`)
    )
});