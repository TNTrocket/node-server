import express from 'express'
import  Admin  from '../controller/admin/admin'

const router = express.Router()

router.post('/login',  Admin.userLogin)


export default router