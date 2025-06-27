import express from "express";
import formidable from "express-formidable";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductsById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts

} from '../controllers/productController.js'
import checkId from "../middlewares/checkId.js";


const router = express.Router();

router.route('/').post(authenticate, authorizeAdmin,formidable(), addProduct)
.get(fetchProducts)

router.route('/allProducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authenticate, authorizeAdmin, checkId, addProductReview)

router.route('/top').get(fetchTopProducts);
router.route('/new').get(fetchNewProducts);

router.route('/:id').put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
.delete(authenticate, authorizeAdmin, removeProduct)
.get(fetchProductsById);

export default router;