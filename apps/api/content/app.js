const express = require("express");
const connectToDatabase = require("./config/database");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDatabase();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan("combined"));

const indexRouter = require("./routes/index");

app.use("/", indexRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
