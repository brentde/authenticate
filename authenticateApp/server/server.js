const express = require('express');
const app = express();
const path = require('path');
const mongo = require('./mongo/mongo');
const authRoutes = require('./auth/index')
const config = {
  appName: "Authenticate Me",
  creationDate: "May 20th, 2021",
  author: "Brent Deaver"
}
const PORT = 8080;

/* Allows the parsing of incoming JSON requests */
app.use(express.json());

/* Allows the parsing or request with urlencoded payloads*/
app.use(express.urlencoded());

/* Serve statis files obtained through the build */
app.use('/', express.static('../dist/authenticateApp'));

/* User auth routes */
app.use('/api/auth', authRoutes);

/* APIs */
app.get('/api/config', (req, res) => {
  res.send(config);
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
