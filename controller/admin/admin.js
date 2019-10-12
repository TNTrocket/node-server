class Admin {
    constructor() {

    }
    userLogin(req, res, next) {
        console.log('req====', req.session)
        res.send('hello word')
    }
}

export default new Admin()