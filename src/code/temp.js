const Dataloader = require("dataloader");
const db = require("../dbConfig");
// Assume you interface with your db
// using e.g. pg-promise / mongoose.
// We will (pretend) to be using
// Postgres with https://github.com/vitaly-t/pg-promise .

const userLoader = new Dataloader(async userIds => {
  const users = await db.query(`SELECT (id, fullName, profilePic) 
     FROM users WHERE id IN ${userIds}`);
  // Suppose our DB/ORM has a penchant for anarchy and returns the array
  // of objects of {id, fullName, profilePic} in an order not matching our
  // userIds array. We'd need to sort these to prevent resolving/rejecting
  // the wrong keys, like so:
  return userIds.map(userId => users.find(user => user.id === userId));
});

exports.default = userLoader;
