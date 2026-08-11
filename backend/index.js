require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errors");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(";")
  : ["http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.options("*splat", cors());

const { PORT = 3000 } = process.env;
const userRouter = require("./routes/users");
const jobCardsRouter = require("./routes/jobCards");
const authUserRouter = require("./routes/auth");

app.use(express.json());
app.use(requestLogger);

app.use(cookieParser());

app.use(authUserRouter);

app.use(auth);

const initApp = async () => {
  app.listen(PORT, () => {
    console.log("Still working!");
  });

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB in Atlas");
  } catch (error) {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  }
};

app.use("/users", userRouter);
app.use("/job-cards", jobCardsRouter);

app.use("*splat", (req, res) => {
  res.status(404).json({ message: "Resource required not found" });
});

app.use(errorLogger);
app.use(errorHandler);

initApp();
