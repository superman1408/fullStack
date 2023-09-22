import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import router from "../routes/users.js";









export const getPosts = async (req, res) => {
    const  { page } = req.query;
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the start index of every page

        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
        // res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};





// QUERY => /posts?page=1 => page = 1
// PARAMS => /posts/1234 => id = 1234
export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;
    // console.log(req.query);

    try {
        const title = new RegExp(searchQuery, 'i'); //'i' matches Tests TESTS tests as test(ignores)
        // console.log(title);

        const postMessages = await PostMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ] });
        // const postMessages = await PostMessage.find();
        // console.log(postMessages);

        res.status(200).json(postMessages);
    } catch (error) {
        // console.log(error);
        res.status(404).json({ message: error.message });
    }

}; //Searches for posts


export const getPost = async (req, res) => {
    const { id } = req.params;
    // console.log(req.params);

    try {
        const post = await PostMessage.findById(id);
        
        res.status(200).json(post);
        // console.log(post);

    } catch (error) {
        res.status(404).json({ message: error.message});
    }
};







//https://www.restapitutorial.com/httpstatuscodes.html


export const createPost = async (req, res) => {
    let date = new Date();
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: date.toISOString()});

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};





export const updatePost = async (req, res) => {
    const { id : _id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post with that id..');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
};





export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id..');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'});
};




export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({ message: "Unauthenticated..!!" });

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post with that id..');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if(index === -1){
        post.likes.push(req.userId);
    }else{
        post.likes = post.likes.filter((id) => id != String(req.userId));
    }


    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });      //{ likeCount: post.likeCount + 1 }earlier

    res.json(updatedPost);
};


export const commentPost = async (req,res) => {
    const { id } = req.params;
    const { value } = req.body;
    // console.log(value);

    const post = await PostMessage.findById(id);

    post.comments.push(value);

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new : true });

    res.json(updatedPost);
};




export default router;



