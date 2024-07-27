import dotenv from 'dotenv'
dotenv.config()

export const {
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USER,
    REDIS_PASSWORD,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD
} = process.env