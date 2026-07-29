const express = require("express");

const router = express.Router();


const protect = require("../middleware/authMiddleware");


const {
    addComment,
    getComments,
    deleteComment
}=require("../controllers/commentController");



// Get comments
router.get("/:postId", getComments);


// Add comment
router.post("/:postId", protect, addComment);


// Delete comment
router.delete("/:id", protect, deleteComment);



module.exports = router;