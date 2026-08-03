const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = require("../utils/config");
const { NotFoundError, UnauthorizedError } = require("../errors/indexErrors");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthorizedError("Password or email incorrect");
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError("Password or email incorrect");
    }

    const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res
      .cookie("jwt", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .send({ message: "Login successful" });
  } catch (err) {
    next(err);
  }
};

// const getUsers = async (req, res, next) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     next(err);
//   }
// };

// const getUserId = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) {
//       throw new NotFoundError("User ID not found");
//     }
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// };

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError("User ID not found");
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      email,
      password: hash,
    });

    const userToReturn = createdUser.toObject();
    delete userToReturn.password;

    res.status(201).json(userToReturn);
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  res.clearCookie("jwt").send({ message: "Logged out successfully" });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
  logout,
};
