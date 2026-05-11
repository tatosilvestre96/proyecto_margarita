import dotenv from 'dotenv'

dotenv.config()

const config = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL || ''
    }
  }
}

export default config
