import { apiSlice } from "./apiSlice.js";
import { CATEGORY_URL } from "../constants.js";
import { buildCreateApi } from "@reduxjs/toolkit/query";

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        createCategory: builder.mutation({
            query: (newCategory) =>({
                url: `${CATEGORY_URL}`,
                method: "POST",
                body: newCategory
            })
        }),
        updateCategory: builder.mutation({
            query: ({categoryId, updatedCategory}) =>({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "PUT",
                body: updatedCategory
            })
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) =>({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE",
            })
        }),
        fetchCategories: builder.query({
            query: () =>({
                url: `${CATEGORY_URL}/categories`,
            })
        })
    })
});

export const {
   useCreateCategoryMutation,
   useUpdateCategoryMutation,
   useDeleteCategoryMutation,
   useFetchCategoriesQuery 
} = categoryApiSlice;