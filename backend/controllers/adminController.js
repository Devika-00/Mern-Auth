import asyncHandler from 'express-async-handler';
import Admin from '../models/adminModel.js'
import User from '../models/userModel.js';
import generateAdminToken from '../utils/generateAdminToken.js';

//@desc Auth admin
//route POST /api/admin/auth
//@access 

const authAdmin=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
  

    const admin=await Admin.findOne({email:email,password:password})
    console.log('After findOne query', admin);

    if(admin){
        generateAdminToken(res,admin._id)
        res.status(201).json({
            _id:admin._id,
            email:admin.email
        })
    }else{
        res.status(401)
        throw new Error('Invalid email or password!')
    }
})


//@desc 
//route GET /api/admin/dashboard
//@access


const loadUsers=asyncHandler(async(req,res)=>{
    if(req.query){
        const search=req.query.search;
        const users=await User.find({name: { $regex: new RegExp(search, 'i') }})
        if(users){
            res.status(201).json({users})
        }else{
            res.status(401)
            throw new Error("No users found")
        }
    }else{
        const users=await User.find();
        if(users){
            res.status(201).json({users})
        }else{
            res.status(401)
            throw new Error("No users found")
        }
    }
    
})

const deleteUser=asyncHandler(async(req,res)=>{
    const {userId}=req.body
    try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        await User.findByIdAndDelete(userId);
        
        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
      }
})

const loadEditUser=asyncHandler(async(req,res)=>{
    const userId=req.query.id;
    try {
        const user=await User.findById(userId);
        if(user){
            return res.status(201).json({user})
        }else{
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
    
})

const updateUser=asyncHandler(async(req,res)=>{
    const {_id,name,email}=req.body
    const existUser=await User.findOne({
        email: req.body.email,
        _id: { $ne:_id }
      });
    if(existUser){
        res.status(400)
        throw new Error('Email already exist!')
    }
    try {
        const user=await User.findById(_id)
        if(user){
            user.name=name || user.name
            user.email=email || user.email
        
        const updatedUser=await user.save()
        res.status(200).json({

            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email
        })
        }else{
            res.status(400).json({message:"error"})
        }

    } catch (error) {
        console.log(error)
    }
})
const addUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    const userExist=await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist!')
    }

    const user=await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data!')
    }
})

//@desc Admin Logout
//route POST /api/admin/logout
//@access 
const logoutAdmin=asyncHandler(async(req,res)=>{
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'Admin logged out!'})
})


export {
    authAdmin,
    loadUsers,
    logoutAdmin,
    deleteUser,
    updateUser,
    loadEditUser,
    addUser
}
