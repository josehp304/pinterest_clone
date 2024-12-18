var mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/pinterest")

const postSchema = mongoose.Schema({
    postImage:{
        type:String,
        required:true
    },
    postText: {type:String
    },
    createdAt: {
        type:Date,
        default:Date.now
    },
    caption:{type:String},

    // likes:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     default:[],    
    // },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
    }

})

postModel = mongoose.model("posts",postSchema)

module.exports= postModel;