import { Response } from 'express'
import { signup, login, getCurrentUser } from '../services/auth.service'
import { verifyRefreshToken, generateAccessToken, JWTPayload } from '../utils/jwt'
import { AuthenticatedRequest } from '../middleware/auth'

/**
 * POST /api/auth/signup
 * Register a new user
 */
export const signupController = async (req: any, res: Response) => {
  try {
    const { email, password, nickname } = req.body

    // Validate required fields
    if (!email || !password || !nickname) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and nickname are required'
      })
    }

    const result = await signup({ email, password, nickname })

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    if (errorMessage.includes('already exists')) {
      return res.status(409).json({
        success: false,
        message: errorMessage,
        error: 'USER_EXISTS'
      })
    }

    return res.status(400).json({
      success: false,
      message: errorMessage,
      error: 'SIGNUP_ERROR'
    })
  }
}

/**
 * POST /api/auth/login
 * Login user and return tokens
 */
export const loginController = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    const result = await login({ email, password })

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    if (errorMessage.includes('Invalid email or password')) {
      return res.status(401).json({
        success: false,
        message: errorMessage,
        error: 'INVALID_CREDENTIALS'
      })
    }

    return res.status(400).json({
      success: false,
      message: errorMessage,
      error: 'LOGIN_ERROR'
    })
  }
}

/**
 * POST /api/auth/refresh
 * Refresh access token using refresh token
 */
export const refreshController = async (req: any, res: Response) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      })
    }

    // Verify refresh token
    const payload = verifyRefreshToken(refreshToken)

    if (!payload) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired refresh token',
        error: 'INVALID_REFRESH_TOKEN'
      })
    }

    // Generate new access token
    const jwtPayload: JWTPayload = {
      userId: payload.userId,
      email: payload.email
    }

    const newAccessToken = generateAccessToken(jwtPayload)

    return res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken
      }
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return res.status(400).json({
      success: false,
      message: errorMessage,
      error: 'REFRESH_ERROR'
    })
  }
}

/**
 * GET /api/auth/me
 * Get current user info (requires authentication)
 */
export const getMeController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: 'User not authenticated'
      })
    }

    const user = await getCurrentUser(req.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    return res.status(200).json({
      success: true,
      message: 'User info retrieved successfully',
      data: user
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'

    return res.status(400).json({
      success: false,
      message: errorMessage,
      error: 'GET_USER_ERROR'
    })
  }
}
