require('dotenv').config();
const cors = require('cors');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const routes = require('./routes');
const express = require('express');
const mongoose = require('mongoose');

// const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 3001;

// Define middleware here
const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// const SID = process.env.TWILIO_SID;
// const TOKEN = process.env.TWILIO_TOKEN;
// const SENDER = process.env.SENDER

// if (!SID || !TOKEN) {
//   return res.json({ message: 'add TWILIO_SID and TWILIO_TOKEN to .env file.' })
// }

// const client = new twilio(SID, TOKEN)

// app.use(cors()); //Blocks browser from restricting any data

//Twilio 
// app.get('/send-text', (req, res) => {
//   //Welcome Message
//   res.send('Hello to the Twilio Server')

//   //_GET Variables
//   const { recipient, textmessage } = req.query;

//   //Send Text
//   client.messages.create({
//     body: textmessage,
//     to: recipient,  // Text this number
//     from: SENDER // From a valid Twilio number
//   }).then((message) => console.log(message.body));
// })

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

// API routes
// require('./routes')(app);

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
    console.error(err);
  }

  console.info(`🌎  ==> API Server now listening on PORT ${PORT}!`);

});

module.exports = app;
