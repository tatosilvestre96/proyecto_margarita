import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key_here_min_32_chars_change_this'
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m'
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your_refresh_secret_key_here_change_this'
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d'

export interface JWTPayload {
  userId: string
  email: string
}

/**
 * Generate access token (short-lived)
 */
export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'] })
}

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN as jwt.SignOptions['expiresIn'] })
}

/**
 * Verify and decode access token
 */
export const verifyAccessToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Verify and decode refresh token
 */
export const verifyRefreshToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as JWTPayload
    return decoded
  } catch (error) {
    return null
  }
}

/**
 * Extract token from Authorization header
 */
export const extractTokenFromHeader = (authHeader?: string): string | null => {
  if (!authHeader) return null
  const parts = authHeader.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return null
  return parts[1]
}
