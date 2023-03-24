const monk = require("monk");

let dbUrl = "localhost:27017/local";

// if (process.env.NODE_ENV === "test") {
//   dbUrl = process.env.TEST_DB_URL;
// }

const db = monk(dbUrl);
console.log(db);
module.exports = db;
