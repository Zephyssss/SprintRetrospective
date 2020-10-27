const router = require("express").Router();

const authRoute = require("./auth.route.js");
const userRoute = require("./user.route.js");
const boardRoute = require("./board.route.js");
const tagRoute = require("./tag.route.js");
const { verifyToken } = require("../controllers/auth.controller.js");

router.use("/auth", authRoute);
router.use(verifyToken)
router.use("/user", userRoute);
router.use("/board", boardRoute);
router.use("/tag", tagRoute);


module.exports = router;
