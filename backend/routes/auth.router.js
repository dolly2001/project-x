import express from "express";
import { login, logout, myProfile, signup } from "../controllers/auth.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router()

// My Profile
router.get("/myprofile",isAuthenticated, myProfile)

// SignUp
router.post("/signup", signup)

// Login
router.post("/login", login)

// Logout
router.post("/logout", logout)

export default router