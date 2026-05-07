import { Router } from 'express'
import {
  signupController,
  loginController,
  refreshController,
  getMeController
} from '../controllers/auth.controller'
import { authMiddleware } from '../middleware/auth'

const router = Router()

/**
 * Public routes
 */

// POST /api/auth/signup
// Register a new user
router.post('/signup', signupController)

// POST /api/auth/login
// Login and get tokens
router.post('/login', loginController)

// POST /api/auth/refresh
// Refresh access token
router.post('/refresh', refreshController)

/**
 * Protected routes (require authentication)
 */

// GET /api/auth/me
// Get current authenticated user
router.get('/me', authMiddleware, getMeController)

export default router
