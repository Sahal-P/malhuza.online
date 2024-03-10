import express from "express";
import connectToDatabase from "./config/database.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import contentRouter from "./routes/index.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDatabase();

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:4173"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(morgan("combined"));


app.use("/api-content/", contentRouter);

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
