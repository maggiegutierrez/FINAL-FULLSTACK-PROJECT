const router = require("express").Router();
const {
  saveJobCard,
  unsaveJobCard,
  getJobCards,
} = require("../controllers/jobCard");

router.post("/:jobCardId", saveJobCard);
router.delete("/:jobCardId", unsaveJobCard);
router.get("/", getJobCards);

module.exports = router;
