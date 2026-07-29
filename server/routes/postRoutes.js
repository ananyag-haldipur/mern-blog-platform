const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");


const {
    createPost,
    getPosts,
    getPostById,
    getMyPosts,
    updatePost,
    deletePost,
    likePost

}=require("../controllers/postController");


// Public routes

router.get("/", getPosts);

router.get("/:id", getPostById);


// Protected routes

router.post("/", protect, createPost);

router.get("/my/posts", protect, getMyPosts);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.put("/:id/like", protect, likePost);

module.exports = router;