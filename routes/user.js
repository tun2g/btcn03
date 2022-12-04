const router = require("express").Router();

const userController = require("../controllers/user");

router.get("/all", userController.findAll);
router.get("/register", userController.renderRegister);
router.get("/", userController.render);

router.post("/", userController.handleLogin);
router.get("/logout", userController.handleLogout);
router.post("/register", userController.handleRegister);

module.exports = router;
