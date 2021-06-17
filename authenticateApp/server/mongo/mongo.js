const mongoose = require('mongoose');
const config = require('../config.json')

/* Connect to MongoDb using Mongoose - make sure to set the auth source
  - UseUnifiedTopology states that one when connection is terminated, all connections will be terminated
  - This isn't applicable to this project, but good to know.
*/

exports.connect = () => {
  mongoose.connect(`${config.mongoURI}`, {useNewUrlParser: true, useUnifiedTopology: true}, (err, db) => {

    if(db)
      console.log("***MONGO CONNECTED***");

    if(err)
      console.log("Mongo failed to connect: ", err);

  });
}

exports.cleanup = () => {
  mongoose.disconnect().then(() => {
    console.log("\n***MONGO DISCONNECTED***");
    process.exit();
  }, err => {
   console.log("There was an error disconnecting from MongoDB.", err);
   process.exit();
  })
}
