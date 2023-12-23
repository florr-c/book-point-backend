require("dotenv/config");
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const mongoDb = require("./database");
const {mongoose} = require ('mongoose');
const cookieParser = require ('cookie-parser');

// environment variables
const PORT = process.env.PORT;
const BASE_URL = process.env.BASE_URL;

const app = express();

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('Database connected'))
.catch((err) => console.log('Database not connected', err))

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(8000, () => {
  console.log(`Web server listening in port ${PORT} - URL: ${BASE_URL}`);
});
