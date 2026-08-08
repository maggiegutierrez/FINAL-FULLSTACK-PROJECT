require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");
const { login, createUser, logout } = require("./controllers/users");
const errorHandler = require("./middlewares/errors");
const cors = require("cors");
const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validator");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const cookieParser = require("cookie-parser");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://project-ef82d4ab-d03e-4bdb-b4a.web.app",
];

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

app.use(express.json());
app.use(requestLogger);

app.post("/login", validateLogin, login);
app.post("/register", validateCreateUser, createUser);
app.post("/logout", logout);

app.use(cookieParser());

app.use(auth);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    app.listen(PORT, () => {
      console.log("Still working!");
    });
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

connectDB();
