const router = require("express").Router();
const { updateUser } = require("../controllers/user.controller.js");
const { retriveUser } = require("../controllers/user.controller.js");

router.put("/", updateUser);
router.get("/", retriveUser);

module.exports = router;
