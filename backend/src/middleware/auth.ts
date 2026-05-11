import { Request, Response, NextFunction } from 'express'
import { extractTokenFromHeader, verifyAccessToken } from '../utils/jwt'

export interface AuthenticatedRequest extends Request {
  userId?: string
  email?: string
}

/**
 * Middleware to verify JWT token and attach user info to request
 */
export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'No token provided',
        error: 'MISSING_TOKEN'
      })
      return
    }

    const payload = verifyAccessToken(token)

    if (!payload) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
        error: 'INVALID_TOKEN'
      })
      return
    }

    // Attach user info to request
    req.userId = payload.userId
    req.email = payload.email

    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
      error: error instanceof Error ? error.message : 'UNKNOWN_ERROR'
    })
  }
}

/**
 * Optional middleware - attach user info if token is present, but don't require it
 */
export const optionalAuthMiddleware = (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization
    const token = extractTokenFromHeader(authHeader)

    if (token) {
      const payload = verifyAccessToken(token)
      if (payload) {
        req.userId = payload.userId
        req.email = payload.email
      }
    }

    next()
  } catch (error) {
    // Continue without authentication
    next()
  }
}
