const router = require("express").Router();
const {
  validateJobCardId,
  validateSaveJobCard,
} = require("../middlewares/validator");
const {
  saveJobCard,
  unsaveJobCard,
  getSavedJobCards,
} = require("../controllers/jobCard");

router.get("/", getSavedJobCards);
router.post("/:jobCardId", validateJobCardId, validateSaveJobCard, saveJobCard);
router.delete("/:jobCardId", validateJobCardId, unsaveJobCard);

module.exports = router;
