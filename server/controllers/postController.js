const Post = require("../models/Post");
const Comment = require("../models/Comment");

// Create Post
exports.createPost = async(req,res)=>{

    try{

        const {
            title,
            content,
            category
        } = req.body;


        let post = await Post.create({

            title,

            content,

            category: category || "General",

            author:req.user.id

        });


        post = await post.populate(
            "author",
            "name email"
        );


        res.status(201).json(post);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Get All Posts + Search + Comment Count

exports.getPosts = async(req,res)=>{

    try{

        const search = req.query.search || "";


        const posts = await Post.find({

            $or:[

                {
                    title:{
                        $regex:search,
                        $options:"i"
                    }
                },

                {
                    content:{
                        $regex:search,
                        $options:"i"
                    }
                },

                {
                    category:{
                        $regex:search,
                        $options:"i"
                    }
                }

            ]

        })
        .populate(
            "author",
            "name email"
        )
        .sort({
            createdAt:-1
        });



        const postsWithComments = await Promise.all(

            posts.map(async(post)=>{


                const commentCount =
                await Comment.countDocuments({
                    post:post._id
                });


                return {

    ...post.toObject(),

    commentCount,

    likeCount: Array.isArray(post.likes) ? post.likes.length : 0

};


            })

        );

        console.log(postsWithComments);

        res.json(postsWithComments);


    }
    catch(error){

    console.log(error);

    res.status(500).json({
        message:error.message
    });

}

};




// Get Single Post

exports.getPostById = async(req,res)=>{

    try{


        const post = await Post.findById(
            req.params.id
        )
        .populate(
            "author",
            "name email"
        );



        if(!post){

            return res.status(404).json({
                message:"Post not found"
            });

        }


        res.json(post);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Get My Posts

exports.getMyPosts = async(req,res)=>{

    try{


        const posts = await Post.find({

            author:req.user.id

        })
        .populate(
            "author",
            "name email"
        )
        .sort({
            createdAt:-1
        });



        res.json(posts);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Update Post

exports.updatePost = async(req,res)=>{

    try{


        const post = await Post.findById(
            req.params.id
        );



        if(!post){

            return res.status(404).json({
                message:"Post not found"
            });

        }



        if(post.author.toString() !== req.user.id){

            return res.status(403).json({
                message:"Not authorized"
            });

        }




        post.title =
        req.body.title || post.title;


        post.content =
        req.body.content || post.content;


        post.category =
        req.body.category || post.category;



        await post.save();




        const updatedPost =
        await Post.findById(post._id)
        .populate(
            "author",
            "name email"
        );



        res.json(updatedPost);


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};



// Delete Post

exports.deletePost = async(req,res)=>{

    try{


        const post = await Post.findById(
            req.params.id
        );



        if(!post){

            return res.status(404).json({
                message:"Post not found"
            });

        }




        if(post.author.toString() !== req.user.id){

            return res.status(403).json({
                message:"Not authorized"
            });

        }



        // delete related comments

        await Comment.deleteMany({
            post:req.params.id
        });



        await post.deleteOne();



        res.json({

            message:"Post deleted"

        });



    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

};


// Like / Unlike Post
exports.likePost = async (req, res) => {

    try {

        const post = await Post.findById(req.params.id);

        if (!post) {

            return res.status(404).json({
                message: "Post not found"
            });

        }

        const userId = req.user.id;

        const alreadyLiked = post.likes.some(
            id => id.toString() === userId
        );

        if (alreadyLiked) {

            post.likes = post.likes.filter(
                id => id.toString() !== userId
            );

        } else {

            post.likes.push(userId);

        }

        await post.save();

        const updatedPost = await Post.findById(post._id)
            .populate("author", "name email");

        res.json({
            message: alreadyLiked
                ? "Post unliked"
                : "Post liked",
            likes: updatedPost.likes.length,
            liked: !alreadyLiked,
            post: updatedPost
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};