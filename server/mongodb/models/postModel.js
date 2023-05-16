import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: { type : String},
    desc: String,
    likes: [],
    image_url: String,
},
    { timestamps: true }
)

const postModel = mongoose.model('post', postSchema)

export default postModel