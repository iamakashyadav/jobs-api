require('dotenv').config();
const express = require('express');

const cors = require('cors');
const helmet = require('helmet');
// swagger import
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const authRouter = require('./routes/auth');
const jobRouter = require('./routes/jobs');
const connectDB = require('./db/connect');
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authMiddelware = require('./middleware/authentication');

// create an express app
const app = express();

// MIDDELWARE
app.use(express.json());
app.use(helmet());
app.use(cors());


// routes
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// to get the swagger api docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authMiddelware, jobRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    console.log("Connected to DB..");
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
