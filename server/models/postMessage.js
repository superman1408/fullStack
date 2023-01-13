import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    creator: String,
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
