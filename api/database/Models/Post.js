const mongoose = require("mongoose");


const {Schema,model} = mongoose;

const postSchema = new Schema({
   
     userId:{
        type:String,
        required:true
     },
     firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath:String,
    postPicturePath: String,
    likes:{
      type: Map,
      of: Boolean
    },
    comments:{
      type: Array,
      default: []
    }
   
},{timestamps:true});


const postmodel = model("post",postSchema);

module.exports = postmodel;

// type:String,
// required:true
// },
// description:{
// type:String,
// required:true
// },
// picture:{
// type:String,
// default:""
// },
// likes:{
// type:Number,
// default: 0
// },
// comments:{
// type:Array,
// default:[]
// },