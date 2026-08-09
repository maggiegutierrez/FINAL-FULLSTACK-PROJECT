const { NotFoundError } = require("../errors/indexErrors");
const User = require("../models/users");

// DESEO GUARDAR ESTA PARTE AUNQUE YA NO SE USE PARA RECORDAR CÓMO LO CONSTRUÍ EN BACKEND
// const getJobCards = async (req, res, next) => {
//   try {
//     const { category, level, location, page = 1 } = req.query;

//     const params = new URLSearchParams();
//     if (category) params.append("category", category);
//     if (level) params.append("level", level);
//     if (location) params.append("location", location);
//     params.append("page", page);
//     if (process.env.MUSE_API_KEY) {
//       params.append("api_key", process.env.MUSE_API_KEY);
//     }

//     const response = await fetch(`${MUSE_BASE_URL}?${params.toString()}`);
//     if (!response.ok) {
//       throw new Error(`The Muse API responded with ${response.status}`);
//     }

//     const data = await response.json();

//     const jobs = data.results.map((job) => ({
//       id: job.id,
//       title: job.name,
//       company: job.company?.name,
//       location: job.locations?.[0]?.name || "Not specified",
//       link: job.refs?.landing_page || "",
//     }));

//     res.json({ jobs, page: data.page, pageCount: data.page_count });
//   } catch (err) {
//     next(err);
//   }
// };

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
