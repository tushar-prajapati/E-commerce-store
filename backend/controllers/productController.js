import asyncHandler from "../middlewares/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import Product from "../models/productModel.js";


const addProduct = asyncHandler(async(req,res)=>{
    try {
        const{name, description, price, category, quantity, brand ,countInStock} = req.fields;
        //validation
        switch (true) {
            case !name:
                 return res.json({error: "Name is required"});
            case !description:
                return res.json({error: "Description is required"});
            case !price:
                return res.json({error: "Price is required"});
            case !category:
                return res.json({error: "Category is required"});

            case !quantity:
                return res.json({error: "Quantity is required"});
            case !countInStock:
                return res.json({error: "Stock is required"});
            case !brand:
                return res.json({error: "Brand name is required"});
        }
        const product = new Product({...req.fields})
        await product.save()
        res.status(200).json(product);
        
    } catch (error) {
        throw new ApiError(400, error.message)
    }

});


const updateProductDetails = asyncHandler(async(req,res)=>{
    try {
        const{name, description, price, category, quantity,countInStock, brand} = req.fields;
        switch (true) {
            case !name:
                 return res.json({error: "Name is required"});
            case !description:
                return res.json({error: "Description is required"});
            case !price:
                return res.json({error: "Price is required"});
            case !category:
                return res.json({error: "Category is required"});
            case !countInStock:
                return res.json({error: "Stock is required"});

            case !quantity:
                return res.json({error: "Quantity is required"});
            case !brand:
                return res.json({error: "Brand name is required"});
        }

        const product = await Product.findByIdAndUpdate(req.params.id,
            { ...req.fields },
            { new: true }
        )
        await product.save();
        
        res.status(200).json(product)


    } catch (error) {
        throw new ApiError(400, error.message)
    }
})

const removeProduct = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        throw new ApiError(402, error.message)
    }
})

const fetchProducts = asyncHandler(async(req,res)=>{
   try {
    const pageSize = 6;
    const keyword = req.query.keyword? {
        name: {$regex: req.query.keyword, $options: 'i'}
    }:{};

    const count = await Product.countDocuments({...keyword});


    const products = await Product.find({...keyword}).limit(pageSize)
    res.status(200).json({products, page: 1, pages: Math.ceil(count/pageSize), hasMore: false})
    
   } catch (error) {
    throw new ApiError(402, error.message)
   }
})

const fetchProductsById = asyncHandler(async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.status(200).json(product)
        }
        else{
            throw new ApiError(403, "Product not found")
        }
    } catch (error) {
        throw new ApiError(403, "Product not found")
    }
})

const fetchAllProducts = asyncHandler(async(req,res)=>{
    try {
        const allProducts = await Product.find({}).populate('category').sort({createdAt: -1});;
        res.status(200).json(allProducts);
    } catch (error) {
        throw new ApiError(403, error.message)
    }
})

const addProductReview = asyncHandler(async(req,res)=>{
    try {
        const {rating, comment} = req.body;
        const product = await Product.findById(req.params.id);

        if(product){
            const alreadyReviewed = product.reviews.find(r=>r.user.toString()===req.user._id.toString())
            if(alreadyReviewed){
                throw new ApiError(402,"Product already reviewed")
            }
            const review = {
                name: req.user.username,
                rating: Number(rating),
                comment,
                user: req.user._id
            }
            product.reviews.push(review);
            product.numReviews = product.reviews.length
            product.rating = product.reviews.reduce((acc, item)=>item.rating + acc, 0) / product.reviews.length;
            await product.save();
            res.status(201).json({message: "Review added"})
        
        }
        else{
            throw new ApiError(403, "Product not found");
        }

    } catch (error) {
        throw new ApiError(403, error.message)
    }
}) 

const fetchTopProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4);
        res.status(200).json(products)
    } catch (error) {
        throw new ApiError(403, error.message)
    }
})


const fetchNewProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({}).sort({createdAt: -1}).limit(5);
        res.status(200).json(products)
    } catch (error) {
        throw new ApiError(403, error.message)
    }
})

const getProductsByCategory = asyncHandler(async(req,res)=>{
    
    try {
        const {categoryId} = req.params;
        const products = await Product.find({category: categoryId})
        res.status(200).json(products)
    } catch (error) {
        throw new ApiError(402, "Retrieve Failed")
    }    
}) 

const filteredProducts = asyncHandler(async(req,res)=>{
    try {
        const {checked, radio} = req.body;
        let args = {}
        if(checked.length>0) args.category = checked;
        if (radio?.length === 1) args.price = { $lte: radio[0] };
        const products = await Product.find(args);
        res.status(200).json(products)

    } catch (error) {
        throw new ApiError(403, "Server Error")
    }
})

export {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchProductsById,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchNewProducts,
    getProductsByCategory,
    filteredProducts

}