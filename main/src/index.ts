import app from './app'
import { PORT } from './config'
import dbConnection from './config/mongo.connection'
import { errorHandler } from './middleware'
import { Log } from './services';

const SERVER_PORT = PORT || 3000;

; (async () => {
    try {
        await dbConnection();

        app.use(errorHandler);
        app.listen(SERVER_PORT, () => {
            console.log(`Server running on port ${SERVER_PORT}`);
        });
    } catch (error: any) {
        Log.error(error.message)
        process.exit(1);
    }
})();

// app.use(errorHandler)
// app.listen(SERVER_PORT, () => {
//     console.log(`Server running on port ${SERVER_PORT}`)
// })