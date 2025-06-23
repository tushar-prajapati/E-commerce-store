import express from "express";
import { createUser, loginUser, logoutUser, getUsers, getCurrentUserProfile,updateUserProfile } from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route('/register').post(createUser)
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser)


// secured routes

router.route('/getUsers').get(authenticate, authorizeAdmin,getUsers)
router.route('/profile').get(authenticate, getCurrentUserProfile);
router.route('/update').put(authenticate, updateUserProfile);


export default router;