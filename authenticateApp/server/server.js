const express = require('express');
const app = express();
const path = require('path');
const mongo = require('./mongo/mongo');
const userModule = require('./user/index')
const PORT = 8080;

/* Allows the parsing of incoming JSON requests */
app.use(express.json());

/* Allows the parsing or request with urlencoded payloads*/
app.use(express.urlencoded());

/* Serve statis files obtained through the build */
app.use('/', express.static('../dist/authenticateApp'));

/* User routes */
app.use('/api/user', userModule.authRoutes);

/* Check auth and get image of boy */
app.get('/api/boi', userModule.auth, (req, res) => {
  res.status(200).sendFile(path.resolve('./shared/img/boi.jpeg'));
})

/* Fall through route - All Angular routes go through the app */
app.get('*', (req, res) => {
  res.sendFile(path.resolve('../dist/authenticateApp/index.html'));
});

/* Run the app on port 8080 */
app.listen(PORT, (req, res) => {
  console.log("The app is listening on port: ", PORT);
  mongo.connect();
});

process.on('SIGINT', mongo.cleanup);
process.on('SIGTERM', mongo.cleanup);
