const router = require("express").Router();

const movieController = require("../controllers/movie");
router.get("/", movieController.render);
router.get("/all", movieController.findAll);

router.post("/search/:id",movieController.search)
router.get("/:id",movieController.renderSearch)
router.get('/detail/:id',movieController.renderDetail)
router.get('/review/:id',movieController.renderReview)
module.exports = router;