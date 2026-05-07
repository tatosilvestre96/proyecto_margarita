import bcryptjs from 'bcryptjs'
import prisma from '../lib/prisma'
import { generateAccessToken, generateRefreshToken, JWTPayload } from '../utils/jwt'

export interface SignupPayload {
  email: string
  password: string
  nickname: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  user: {
    id: string
    email: string
    nickname: string
  }
  accessToken: string
  refreshToken: string
}

/**
 * Sign up a new user
 */
export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const { email, password, nickname } = payload

  // Validate inputs
  if (!email || !password || !nickname) {
    throw new Error('Email, password, and nickname are required')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email }
  })

  if (existingUser) {
    throw new Error('User with this email already exists')
  }

  // Hash password
  const hashedPassword = await bcryptjs.hash(password, 10)

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      nickname
    }
  })

  // Generate tokens
  const jwtPayload: JWTPayload = {
    userId: user.id,
    email: user.email
  }

  const accessToken = generateAccessToken(jwtPayload)
  const refreshToken = generateRefreshToken(jwtPayload)

  return {
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname
    },
    accessToken,
    refreshToken
  }
}

/**
 * Login user
 */
export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { email, password } = payload

  // Validate inputs
  if (!email || !password) {
    throw new Error('Email and password are required')
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  // Verify password
  const isValidPassword = await bcryptjs.compare(password, user.password)

  if (!isValidPassword) {
    throw new Error('Invalid email or password')
  }

  // Generate tokens
  const jwtPayload: JWTPayload = {
    userId: user.id,
    email: user.email
  }

  const accessToken = generateAccessToken(jwtPayload)
  const refreshToken = generateRefreshToken(jwtPayload)

  return {
    user: {
      id: user.id,
      email: user.email,
      nickname: user.nickname
    },
    accessToken,
    refreshToken
  }
}

/**
 * Get current user by ID
 */
export const getCurrentUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      nickname: true,
      createdAt: true
    }
  })

  return user
}
