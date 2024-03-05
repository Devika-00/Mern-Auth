import express from 'express'
const router=express.Router()

import {authAdmin,loadUsers,logoutAdmin,deleteUser,updateUser,loadEditUser,addUser} from '../controllers/adminController.js'
import {protectAdmin} from '../middleware/adminAuthMiddleware.js'


router.post('/auth',authAdmin)
router.get('/dashboard',protectAdmin,loadUsers)
router.post('/logout',logoutAdmin)
router.delete('/deleteuser',protectAdmin,deleteUser)
router.get('/edituser',protectAdmin,loadEditUser)
router.put('/updateuser',protectAdmin,updateUser)
router.post('/adduser',protectAdmin,addUser)

export default router;