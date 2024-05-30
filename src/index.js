const express = require("express");
require("dotenv").config();

const rateLimit = require("express-rate-limit");
const pool = require("./utils/Database");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    // console.log("Database connection successful:", result.rows[0]);
    console.log(`Database connection successful: ${result.rows[0].now}`);
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
})();

//rate limiter
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: 429,
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
});


app.use(rateLimiter);
app.get('/', (req, res) => {
  res.send('Welcome to the Auction API');
});

// console.log("PORT:", process.env.PORT);
// console.log("DATABASEURL:", process.env.DBUSER);
// console.log("APIKEY:", process.env.DBPASSWORD);

app.use("/users", require("./Routes/UserRouter"));
app.use("/Items", require("./Routes/ItemRoute"));
app.use("/Bids", require("./Routes/BidRoute"));
app.use("/Notification", require("./Routes/NotificationRoute"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
