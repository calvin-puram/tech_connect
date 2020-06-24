const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const chalk = require('chalk');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const compression = require('compression');
const connectDb = require('./config/db.js');
const errorHandler = require('./middleware/errorHandler');

// handle uncaught exception
process.on('uncaughtException', err => {
  console.log(chalk.red(`uncaught exception: ${err.stack}`));
  process.exit(1);
});
dotenv.config({ path: './config/config.env.env' });

//routes
const profileRoutes = require('./routes/profile');
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');

const app = express();
app.use(helmet());
app.use(cors());
app.enable('trust proxy');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//connect db
connectDb();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
  message: 'Too many request from this IP, please try again after 10mins'
});

app.use(mongoSanitize());
app.use(xss());
app.use(limiter);
app.use(hpp());
app.use(compression());

app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/posts', postsRoutes);

//errors
app.use(errorHandler);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    chalk.blue(
      `server is in ${process.env.NODE_ENV} mode & listening on port ${process.env.PORT}`
    )
  );
});

//unhandled promise rejection
process.on('unhandledRejection', err => {
  console.log(chalk.red(`unhandled rejection: ${err.stack}`));
  server.close(() => {
    process.exit(1);
  });
});

//handle heroku SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM: server shutting gracefully!');
  server.close(() => {
    console.log('process terminated');
  });
});
