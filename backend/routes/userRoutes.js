import express from "express";
import { 
    createUser,
    loginUser, 
    logoutUser, 
    getUsers, 
    getCurrentUserProfile,
    updateUserProfile,
    deleteUserById,
    getUserById,
    updateUserById

} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.route('/register').post(createUser)
router.route('/login').post(loginUser);
router.route('/logout').post(logoutUser)


// secured routes

router.route('/getUsers').get(authenticate, authorizeAdmin, getUsers)
router.route('/profile').get(authenticate, getCurrentUserProfile);
router.route('/update').put(authenticate, updateUserProfile);

// admin routes
router.route('/delete/:id').delete(authenticate, authorizeAdmin, deleteUserById);
router.route('/getUser/:id').get(authenticate, authorizeAdmin, getUserById);
router.route('/update/:id').put(authenticate, authorizeAdmin, updateUserById)


export default router;