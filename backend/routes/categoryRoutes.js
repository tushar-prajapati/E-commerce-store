import express from 'express'
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import { 
    createCategory, 
    listCategories, 
    removeCategory, 
    updateCategory,
    readCategory

} from '../controllers/categoryController.js';


const router = express.Router()

router.route('/').post(authenticate, authorizeAdmin, createCategory);
router.route('/:categoryId').put(authenticate, authorizeAdmin,updateCategory);
router.route('/:categoryId').delete(authenticate, authorizeAdmin, removeCategory)
router.route('/categories').get(listCategories)
router.route('/:id').get(readCategory)

export default router