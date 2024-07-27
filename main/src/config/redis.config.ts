import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from ".";

export const connection = {
    host: REDIS_HOST as string,
    port: parseInt(REDIS_PORT as string),
    password: REDIS_PASSWORD as string
}