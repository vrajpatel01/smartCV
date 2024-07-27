import dotenv from 'dotenv';
dotenv.config();

export const {
    PORT,
    LOG_SHOW_DATE,
    DEBUG_MODE,
    MONGO_URL,
    MONGO_DB_NAME,
    SAULT_ROUND,
    JWT_SECRET,
    ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN,
    REDIS_HOST,
    REDIS_PORT,
    REDIS_USER,
    REDIS_PASSWORD,
    FRONTEND_URL
} = process.env;