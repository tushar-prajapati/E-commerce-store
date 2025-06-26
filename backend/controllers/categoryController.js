import Category from '../models/categoryModel.js'
import asyncHandler from '../middlewares/asyncHandler.js'
import { ApiError } from '../utils/apiError.js';

const createCategory = asyncHandler(async(req,res)=>{
    try {
        const {name} = req.body;
        if(!name){
            throw new ApiError(401,"Name is required" )
        }
        const existingCategory = await Category.findOne({name})
        if(existingCategory){
            throw new ApiError(402, `Category "${name}" already Exists`)
        }

        const category = await new Category({name}).save();
        if(!category){
            throw new ApiError(401, "Something went wrong")
        }


        res.status(200).json(category);


        
    } catch (error) {
        throw new ApiError(400, error);
    }
});

const updateCategory = asyncHandler(async(req,res)=>{
    try {
        const {name} = req.body;
        const {categoryId}= req.params;

        const category = await Category.findOne({_id: categoryId})

        if(!category){
            throw new ApiError(403, "Category not found")
        }
        category.name = name;
        const updatedCategory = await category.save();
        if(!updatedCategory){
            throw new ApiError(401, "Something went wrong")
        }

 
        res.status(200).json(updatedCategory)
    } catch (error) {
        throw new ApiError(402, error)
    }
})

const removeCategory = asyncHandler(async(req,res)=>{
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId)
        if(!removed){
            throw new ApiError(402, "Category not found")
        }
        res.status(200).json({
            message: "Category removed successfully",
            removed
        });

    } catch (error) {
        throw  new ApiError(401, error)
    }
})

const listCategories = asyncHandler(async(req,res)=>{
    try {
        const all = await Category.find({});
        res.status(200).json(all);
    } catch (error) {
        throw new ApiError(401, error)
    }
})

const readCategory = asyncHandler(async(req,res)=>{
    try {
        const category = await Category.findById(req.params.id);
        if(!category){
            throw new ApiError(403, "Category not found")
        }
        res.status(200).json(category)

    } catch (error) {
        throw new ApiError(401, error)  
    }
})

export {
    createCategory,
    updateCategory,
    removeCategory,
    listCategories,
    readCategory,

}