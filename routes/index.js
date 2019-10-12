import express from 'express'
import admin from './admin'
import user from './user'



const router = express.Router()

let allCallBack = (req, res, next) => {
    console.log('req.sessionID====', req.sessionID)
    console.log('req.cookies.SID====', req.cookies.SID)
    console.log('req.path', req.path)
    let user = req.session.user
    if (req.path === '/user/captcha' || req.path === '/user/login') {
        return next()
    }

    if (req.sessionID !== req.cookies.SID) {
        res.json({
            success: true,
            message: '会话过期'
        })
        return
    }
    if (user) {
        next()
    } else {
        res.json({
            success: true,
            message: '404'
        })
    }
}
router.get('*', allCallBack)
router.post('*', allCallBack)

export default (app) => {
    app.use('/', router)
    app.use('/admin', admin)
    app.use('/user', user)
}