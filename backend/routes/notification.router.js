import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import { deleteNotifications, getNotifications } from '../controllers/notification.controller.js'

const router = express.Router()


router.get("/", isAuthenticated, getNotifications)
router.delete("/", isAuthenticated, deleteNotifications)

export default router