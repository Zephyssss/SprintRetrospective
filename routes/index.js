const router = require("express").Router();

const authRoute = require("./auth.route.js");
const userRoute = require("./user.route.js");

router.use("/auth", authRoute);
router.use("/user", userRoute)

module.exports = router;
