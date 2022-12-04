const router = require("express").Router();

const castController = require("../controllers/cast");

router.get("/all",castController.findAll)
router.get('/:id',castController.renderSearch)
router.post('/search/:id',castController.search)
router.get('/detail/:id',castController.renderDetail)

module.exports = router;