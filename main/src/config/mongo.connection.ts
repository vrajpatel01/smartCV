import mongoose from "mongoose";
import { Log } from "../services";
import { MONGO_URL, MONGO_DB_NAME } from ".";

const dbConnection = async () => {
    try {
        const connection = await mongoose.connect(`${MONGO_URL}/${MONGO_DB_NAME}?authSource=admin&retryWrites=true&w=majority`, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        Log.success(`Successfully connected to MongoDB ${connection.connection.host}`);

        connection.connection.on('error', (err) => {
            Log.error(`Error: ${err.message}`);
            process.exit(1);
        })
        return connection
    } catch (error) {
        Log.error(error);
        throw new Error('Error connecting to database');
    }
}

export default dbConnection;