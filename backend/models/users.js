const mongoose = require("mongoose");
const { Schema } = mongoose;

const savedJobSchema = new Schema({
  jobId: { type: Number, required: true },
  title: { type: String, required: true },
  company: { type: String },
  location: { type: String },
  link: { type: String },
  savedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: { type: String, required: true, minlength: 6, select: false },
    savedJobs: [savedJobSchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
