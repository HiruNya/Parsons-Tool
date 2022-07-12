import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes';

// Setup Express
const app = express();
const port = process.env.PORT || 3000;

// Setup JSON parsing for request body
app.use(express.json());

// Setup API Routes.
app.use('/', routes);

// Make the public folder available statically
app.use(express.static(path.join(__dirname, 'public')));

// Serve up the frontend's "build" directory, if we're running in production mode.
if (process.env.NODE_ENV === 'production') {
  console.log('Running in production');

  // Make all files in that folder public
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // If we get any GET requeset we can't proces using one of the server routes, serve up index.html by default.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Connect to the database and then start the server
mongoose
  .connect('mongodb://localhost:27017/mongodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => console.log(`App server listening on port ${port}!`));
  });
