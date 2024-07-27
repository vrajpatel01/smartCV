import express from 'express';
import cors from 'cors';
import router from './routes';
import cookieParser from 'cookie-parser';
import { ipAddress, routeLogger } from './middleware';
import { unmatchRouteController } from './controllers';
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.set('trust proxy', 1);
app.use(ipAddress)
app.use(routeLogger)
app.use('/api', router)
app.use(unmatchRouteController)

export default app;