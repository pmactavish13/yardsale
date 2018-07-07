const bodyParser = require('body-parser');
const routes = require('./routes');
const express = require('express');
// const fs = require('fs');
// const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
// const path = require('path');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');

// const config = require('../config/config');
// const webpackConfig = require('../webpack.config');

// const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3001;

// Define middleware here
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactyardsale");
// mongoose.connect(isDev ? config.db_dev : config.db);
// mongoose.Promise = global.Promise;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// API routes
app.use(routes);

// if (isDev) {
//   const compiler = webpack(webpackConfig);

//   app.use(historyApiFallback({
//     verbose: false
//   }));

//   app.use(webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath,
//     contentBase: path.resolve(__dirname, '../client/public'),
//     stats: {
//       colors: true,
//       hash: false,
//       timings: true,
//       chunks: false,
//       chunkModules: false,
//       modules: false
//     }
//   }));

//   app.use(webpackHotMiddleware(compiler));
//   app.use(express.static(path.resolve(__dirname, '../dist')));
// } else {
//   app.use(express.static(path.resolve(__dirname, '../dist')));
//   app.get('*', function (req, res) {
//     res.sendFile(path.resolve(__dirname, '../dist/index.html'));
//     res.end();
//   });
// }

app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = app;
