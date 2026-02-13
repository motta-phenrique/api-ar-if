import express, { Request, Response, NextFunction } from 'express';
import routes from "./routers/index.js"
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

const app = express();

app.use(morgan('tiny'));

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use('/api', routes);

export default app;