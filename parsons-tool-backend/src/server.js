import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './routes';

// Setup Express
const app = express();
const port = process.env.PORT || 3001;
const mongoDbUrl = process.env.MONGO_DB || 'mongodb://localhost:27017/parsons';

console.log('Using MongoDB URL', mongoDbUrl);

// Setup JSON parsing for request body
app.use(express.json());

// Setup CORS for frontend access to server
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Setup API Routes.
app.use('/', router);

// Connect to the database and then start the server
mongoose
  .connect(mongoDbUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`App server listening on port ${port}!`));
  });
