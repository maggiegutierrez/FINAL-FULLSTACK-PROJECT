const router = require('express').Router();
const { saveJobCard, unsaveJobCard } = require('../controllers/jobCard');

router.post('/:jobCardId', saveJobCard);
router.delete('/:jobCardId', unsaveJobCard);

module.exports = router;
