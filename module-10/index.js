
const app = require('./app.js');
const db = require('./Config/db.js');

db.query("SELECT 1")
  .then(() => {
    console.log("db connected");

    app.listen(3000, () => {
      console.log("Working");
    });
  })
  .catch((e) => {
    console.error("DB connection failed", e);
  });
