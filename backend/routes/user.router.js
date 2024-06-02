import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { followUnfollow, getOtherUserProfile, getSuggestedUsers, updateUser } from "../controllers/user.controller.js"

const router = express.Router()

// get other user profile
router.get("/profile/:username", isAuthenticated, getOtherUserProfile)

// follow and unfollow users
router.post("/follow/:id", isAuthenticated, followUnfollow)

// suggested user profile
router.get("/suggested", isAuthenticated, getSuggestedUsers)

//  Update profile
router.post("/update", isAuthenticated, updateUser)

export default router