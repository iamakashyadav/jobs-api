import express, { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');

// project import
import authRouter from "./routes/auth";
import jobRouter from "./routes/jobs";
import connectDB from "./db/connect";
import requestId from "./middleware/requestId";
import logger from "./middleware/logger";
import notFound from './middleware/not-found';
import errorHandlerMiddleware from './middleware/error-handler';
import authMiddelware from "./middleware/authentication";

// create an express app
const app = express();

// MIDDELWARE
app.use(express.json());
app.use(helmet());
app.use(requestId);
app.use(logger);
app.use(cors());


// routes
app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

// to get the swagger api docs
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddelware, jobRouter);


app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to DB..");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
