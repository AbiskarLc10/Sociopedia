
const Post = require("../database/Models/Post");
const User = require("../database/Models/User")

const createUserPost = async (req,res,next) =>{

    try {

        const {description,postPicturePath,userId} = req.body;
        const user = await User.findById(userId);

        console.log(user);
        const newPost = await Post.create({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            picturePath: user.picturePath,
            postPicturePath,
            likes:{},
        });

        if(!newPost){
            return next({status:400,message:"Failed to create a post"})
        }


        return res.status(201).json(newPost);


    } catch (error) {
        next(error)
    }
}

const getAllPosts = async (req,res,next) =>{

    try {

        const posts = await Post.find().sort({createdAt: -1});


        if(!posts){
            return next({status:404,message:"Posts not found"})
        }
        
        return res.status(200).json(posts);

    } catch (error) {
        next(error)
    }

}

const getUserPosts = async (req,res,next) =>{

    try {
        
        const {id} = req.user;
        const {userId} = req.params;

        // if(id!== userId){
        //     return next({status:401,message:"Unauthorized"})
        // }

        const userPosts = await Post.find({userId});

        if(!userPosts){
            return next({status:404,message:"No posts to display",extraDetails:"Create a post"})
        }

        return res.status(200).json(userPosts);
    } catch (error) {
        next(error);
    }
}

const likePost = async (req,res,next) =>{

    try {

        const {postId} = req.params;

        const {userId} = req.body;
        const post = await Post.findById(postId);
         console.log(post)
        if(!post){
            return next({status:404,message:"Post Unavailable"});
        }

        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        }else{
            post.likes.set(userId,true);
        }
      await post.save();

      return res.status(200).json(post);
        
    } catch (error) {
        next(error)
    }
}

const getUserByPost = async(req,res,next) =>{

    try {

        const {userId} = req.params;
        const userdata = await User.findById(userId);
        if(!userdata){
            return next({status:404,message:"Failed to get post owner"});
        }

        const {password:pass,email,...rest} = userdata._doc;

        return res.status(200).json(rest);

        
    } catch (error) {
        console.log(error)
        next(error);
    }
}

module.exports = {createUserPost,getAllPosts,getUserPosts,likePost,getUserByPost}