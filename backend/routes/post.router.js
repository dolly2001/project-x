import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { commentOnPost, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getUserPosts, likeUnlikePost } from "../controllers/post.controller.js";


const router = express.Router();

// Get All post
router.get("/all", isAuthenticated, getAllPosts);

// Posts of the user that I'm Following
router.get("/following", isAuthenticated, getFollowingPosts);

// Liked post of loggedin user
router.get("/likes/:id", isAuthenticated, getLikedPosts);


router.get("/user/:username", isAuthenticated, getUserPosts);

// Create Post
router.post("/create", isAuthenticated, createPost);

//  Like Unlike post
router.post("/like/:id", isAuthenticated, likeUnlikePost);

// // Comment post
router.post("/comment/:id", isAuthenticated, commentOnPost);

// // delete post
router.delete("/:id", isAuthenticated, deletePost);

export default router;