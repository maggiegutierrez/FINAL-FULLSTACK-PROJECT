const { NotFoundError } = require("../errors/indexErrors");
const User = require("../models/users");

const saveJobCard = async (req, res, next) => {
  try {
    const jobId = Number(req.params.jobCardId);
    const { title, company, location, link } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) throw new NotFoundError("User not found");

    const alreadySaved = user.savedJobs.some((job) => job.jobId === jobId);
    if (!alreadySaved) {
      user.savedJobs.push({ jobId, title, company, location, link });
      await user.save();
    }

    res.status(200).json(user.savedJobs);
  } catch (err) {
    next(err);
  }
};

const unsaveJobCard = async (req, res, next) => {
  try {
    const jobId = Number(req.params.jobCardId);

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { savedJobs: { jobId } } },
      { new: true },
    );
    if (!user) throw new NotFoundError("User not found");

    res.status(200).json(user.savedJobs);
  } catch (err) {
    next(err);
  }
};

module.exports = { saveJobCard, unsaveJobCard };
