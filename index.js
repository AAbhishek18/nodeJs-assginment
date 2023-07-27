const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const route = require("./routes/routes.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();
//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is Connected!"))
  .catch((err) => console.log(err));
//CORS
app.use(cors());
//routes
app.use("/api/", route);
//if api not found
app.all("*", (req, res) => {
  res.status(404).json({ status: false, message: "Invalid route" });
});
//server listen on port 3000
app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});


