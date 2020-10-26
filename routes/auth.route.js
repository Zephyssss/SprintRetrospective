const router = require("express").Router();

const authController = require("../controllers/auth.controller.js");

router.post("/register", authController.registerUsername);
router.post("/login",authController.loginUsername)

module.exports = router;