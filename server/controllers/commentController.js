const Comment = require("../models/Comment");


// Add Comment
exports.addComment = async(req,res)=>{

    try{

        const {text} = req.body;


        const comment = await Comment.create({

            text,

            user:req.user.id,

            post:req.params.postId

        });


        res.status(201).json(comment);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Get Comments of a Post
exports.getComments = async(req,res)=>{

    try{

        const comments = await Comment.find({
            post:req.params.postId
        })
        .populate("user","name email")
        .sort({
            createdAt:-1
        });


        res.json(comments);


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Delete Comment
exports.deleteComment = async(req,res)=>{

    try{

        const comment = await Comment.findById(req.params.id);


        if(!comment){

            return res.status(404).json({
                message:"Comment not found"
            });

        }


        await comment.deleteOne();


        res.json({
            message:"Comment deleted"
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};