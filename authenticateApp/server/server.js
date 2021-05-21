const express = require('express');
const app = express();
const mongo = require('./mongo/mongo')
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

/* Run the app on port 3000 */
app.listen(PORT, (req, res) => {
  console.log("The app is listening on port: ", PORT);
  mongo.connect();
});

/* APIS */
app.get('/api/config', (req, res) => {
    res.send(config);
})

// app.get('/api/login', require('/passport/local'));
