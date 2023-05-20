import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:true
    },
    profilePicture: String,
    coverPicture: String,
    about:String,
    country:String,
    livesin:String,
    worksAt:String,
    relationship:String,
    followers: [],
    following: []
},
{timestamps:true}
);

const userModel = mongoose.model('Users', UserSchema);

export default userModel;