import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    name: String,
    creator: String,
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    comments: {
        type: [String],
        default: [],
    },
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
