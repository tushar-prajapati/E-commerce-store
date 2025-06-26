import { apiSlice } from "./apiSlice.js";
import { USERS_URL } from "../constants.js";
import { buildCreateApi } from "@reduxjs/toolkit/query";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        login: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: ()=>({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        register: builder.mutation({
            query: (data)=>({
                url:`${USERS_URL}/register/`,
                method: 'POST',
                body: data,
            })
        }),
        profile: builder.mutation({
            query: (data)=>({
                url:`${USERS_URL}/update/`,
                method: 'PUT',
                body: data 
            })
        }),
        getUsers: builder.query({
            query: ()=>({
                url: `${USERS_URL}/getUsers/`,
            }),
            providesTags: ['User'],
            keepUnusedDataFor: 5,
        }),
        deleteUser: builder.mutation({
            query: (userId)=>({
                url: `${USERS_URL}/delete/${userId}`,
                method: "DELETE",

            })
        }),
        getUserDetails: builder.query({
            query: (id)=>({
                url: `${USERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),

        updateUser: builder.mutation({
            query: (data)=>({
                url:`${USERS_URL}/update/${data.userId}`,
                method: 'PUT',
                body: data 
            }),
            invalidatesTags: ["User"]
        }),
    })
});

export const {
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useProfileMutation, 
    useGetUsersQuery,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useUpdateUserMutation
} = usersApiSlice;