import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser : null,
    error: null,
    loading: false,
    posts:[]
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

        signInStart : (state) =>{
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state,action) =>{
            state.loading = false;
            state.error = null;
            state.currentUser = action.payload;
        },
        signInFailure: (state,action) =>{
            state.loading = false;
            state.error = action.payload;
        },
        clearError: (state) =>{
            state.error = null;
        },
        setPosts: (state,action) =>{
            state.posts = action.payload;
        },
        signOutSuccess: (state) =>{

            state.error = null;
            state.currentUser = null;
            state.loading = false;
            state.posts = []
        },
        updatePost: (state,action) =>{

            const updatedPosts = state.posts.map((post)=>{
                if(post._id === action.payload._id) return action.payload;

              return post;  
            })
            state.posts = updatedPosts;
        }
    }
})

export const {signInStart,signInSuccess,signInFailure,signOutSuccess,clearError,setPosts} = userSlice.actions;

export default userSlice.reducer;