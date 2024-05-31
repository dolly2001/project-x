import express from "express";
import { login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router()

// SignUp
router.post("/signup", signup)

// Login
router.post("/login", login)

// Logout
router.post("/logout", logout)

export default router