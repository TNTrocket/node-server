import userModel from '../../models/user/user'
import svgCaptcha from 'svg-captcha'

class user {
    constructor() {

    }
    async login(req, res, next) {
        console.log('req=======', req.body, req.sessionID)
        let {
            username,
            password,
            captcha_code
        } = req.body
      
        try {
            if (!username) {
                throw new Error('用户名参数错误')
            } else if (!password) {
                throw new Error('密码参数错误')
            } else if (!captcha_code) {
                throw new Error('验证码参数错误')
            }
        } catch (e) {
            res.json({
                success: false,
                message: e.message
            })
            return next()
        }
        console.log('req.session=====', req.session)
    
        if (req.session.captcha !== captcha_code) {
            res.json({
                success: true,
                // code: '',
                message: '验证码不正确'
            })
            return next()
        }
        let user = ''

        try {
            user = await userModel.findOne({
                username
            });
            if (user && (user.password === password)) {
              
                res.json({
                    success: true,
                    code: 'LOGIN_SUCCESS',
                    message: '登录成功'
                })
                req.session.user = user
            } else {
                res.json({
                    success: false,
                    code: 'USER_NOT_FOUND',
                    message: '用户不存在'
                })
            }
        } catch (e) {
            console.log(e)
        }
        next()
    }
    getcaptcha(req, res, next) {
        console.log('req=======', req.body, req.sessionID)
        let captcha = svgCaptcha.create({
            // 翻转颜色  
            inverse: false,
            // 字体大小  
            fontSize: 36,
            // 噪声线条数  
            noise: 2,
            // 宽度  
            width: 80,
            // 高度  
            height: 30,
        });
        req.session.captcha = captcha.text.toLowerCase()
        console.log('req.session====', req.session)
        res.setHeader('Content-Type', 'image/svg+xml');
        res.write(String(captcha.data));
        res.end();
        // next()
    }
}

export default new user()