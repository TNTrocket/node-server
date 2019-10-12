import express from 'express'
import user from '../controller/user/user'

const router = express.Router()

router.post('/login', user.login)
router.get('/captcha', user.getcaptcha)

export default router