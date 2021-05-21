const mongoose = require('mongoose');
const config = require('../shared/config.json')

/* Connect to MongoDb using Mongoose - make sure to set the auth source
  - UseUnifiedTopology states that one when connection is terminated, all connections will be terminated
  - This isn't applicable to this project, but good to know.
*/

exports.connect = () => {
  mongoose.connect(`${config.mongoURI}/Auth?authSource=admin`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {

    if(db)
      console.log("***MONGO CONNECTED***");

    if(err)
      console.log("Mongo failed to connect: ", err);

  });
}

/* Disconnect from mongoDB */
exports.disconnect = () => {
  mongoose.disconnect().then(success => {
    console.log("***MONGO DISCONNECTED***");
  })
  .catch(err => {
    console.log("There was a problem disconnecting: ", err);
  })
}
