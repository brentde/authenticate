const express = require('express');
const config = {
  appName: "Authenticate Me",
  creationDate: "May 20th, 2021",
  author: "Brent Deaver"
}

/* Create express app */
const app = express();

/* Allows the parsing of incoming JSON requests */
app.use(express.json());

/* Allows the parsing or request with urlencoded payloads*/
app.use(express.urlencoded());

/* Run on port 3000 */
const PORT = 8080;

/* Serve statis files obtained through the build */
app.use('/', express.static('../dist/authenticateApp'));

/* Run the app on port 3000 */
app.listen(PORT, (req, res) => {
  console.log("The app is listening on port: ", PORT)
});

/* APIS */
app.get('/api/config', (req, res) => {
    res.send(config);
})
