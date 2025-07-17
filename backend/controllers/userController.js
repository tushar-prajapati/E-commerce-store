import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        
        throw new ApiError(400, "All fields are required.");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
       throw new ApiError(500, "User already Exists")
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const newUser = new User({
        username, email, password: hashedPassword
    });

    try {

        await newUser.save()

        generateToken(res, newUser._id)

        res.status(201).json({ _id: newUser._id, username: newUser.username, email: newUser.email , isAdmin: newUser.isAdmin})
    } catch (error) {

        throw new ApiError(400, "Invalid User Data")
    }



})

const loginUser = asyncHandler(async (req, res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        throw new ApiError(403, "All fields are required!")
    }
    const user = await User.findOne({email});
    if(!user) {
        throw new ApiError(401, "User not found!")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if(!isPasswordCorrect){
        throw new ApiError(401, "Incorrect Password")
    }

    generateToken(res, user._id);
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    });
    return;

})

const logoutUser = asyncHandler(async (req, res)=>{
    res.cookie('jwt', '',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({messgae: "Logout Successfully"})
})

const getUsers = asyncHandler(async(req,res)=>{
    const users = await User.find({});
    res.status(200).json(users)
})

const getCurrentUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(401, "User not found")
    }
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email
    })
})

const updateUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(!user){
        throw new ApiError(401, "User not found")
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if(req.body.password){

       const newPassword = req.body.password;
       const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(newPassword, salt);
     user.password = hashedPassword;
    }
    const updatedUser = await user.save();

    res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email
    })


})

const deleteUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        throw new ApiError(401, "User not found");
    }
    if(user.isAdmin){
        throw new ApiError(402, "Admin Cannot be deleted")
    }
    await User.deleteOne({_id: user._id})

    res.status(200).json({msg: "User deleted Successfully"})
})

const getUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(!user){
        throw new ApiError(402, "User not found")
    }
    else{
        res.json(user)
    }
})

const updateUserById = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.params.id).select("-password");
    if(!user){
        throw new ApiError(402, "User not found")
    }
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin

    const updatedUser = await user.save();
    res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin
    })

})

export { 
    createUser, 
    loginUser, 
    logoutUser, 
    getUsers, 
    getCurrentUserProfile, 
    updateUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
 }

 j